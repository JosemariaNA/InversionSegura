const express = require('express');
const router = express.Router();
const axios = require('axios');
const supabase = require('../db');

const CACHE_HORAS = parseInt(process.env.CACHE_HORAS) || 24;

// Middleware: verifica token JWT (opcional en esta ruta)
function obtenerUsuario(req, res, next) {
  const auth = req.headers.authorization;
  if (auth) {
    const jwt = require('jsonwebtoken');
    try {
      req.usuario = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    } catch (_) {}
  }
  next();
}

// GET /api/financiero/:simbolo
router.get('/:simbolo', obtenerUsuario, async (req, res) => {
  const simbolo = req.params.simbolo.toUpperCase();
  const tipo = 'income_statement';

  try {
    // 1. Calcular el tiempo de corte para la caché
    const cutoff = new Date(Date.now() - CACHE_HORAS * 60 * 60 * 1000).toISOString();

    // 2. Buscar en caché (Supabase filtra por simbolo, tipo y que no haya expirado)
    const { data: cache } = await supabase
      .from('cache_financiero')
      .select('datos, actualizado_en')
      .eq('simbolo', simbolo)
      .eq('tipo', tipo)
      .gte('actualizado_en', cutoff)
      .limit(1);

    let datos;
    if (cache && cache.length > 0) {
      // Los datos JSONB ya vienen parseados desde Supabase
      datos = cache[0].datos;
    } else {
      // 3. Llamar a Alpha Vantage
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'INCOME_STATEMENT',
          symbol: simbolo,
          apikey: process.env.ALPHA_VANTAGE_KEY,
        },
      });
      datos = response.data;

      // 4. Guardar / actualizar en caché
      // ON CONFLICT (simbolo, tipo) → actualiza si ya existe
      const { error: cacheError } = await supabase
        .from('cache_financiero')
        .upsert(
          [{ simbolo, tipo, datos, actualizado_en: new Date().toISOString() }],
          { onConflict: 'simbolo,tipo' }
        );

      if (cacheError) console.error('Error guardando caché:', cacheError);
    }

    // 5. Guardar en historial si hay usuario autenticado
    if (req.usuario) {
      await supabase
        .from('historial_busquedas')
        .insert([{ usuario_id: req.usuario.id, simbolo }]);
    }

    res.json(datos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener datos financieros' });
  }
});

// GET /api/financiero/usuario/historial — historial del usuario autenticado
router.get('/usuario/historial', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No autenticado' });

  try {
    const jwt = require('jsonwebtoken');
    const usuario = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);

    const { data: rows, error } = await supabase
      .from('historial_busquedas')
      .select('simbolo, buscado_en')
      .eq('usuario_id', usuario.id)
      .order('buscado_en', { ascending: false })
      .limit(20);

    if (error) throw error;
    res.json(rows);
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
});

module.exports = router;