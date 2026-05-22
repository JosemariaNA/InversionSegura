const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../db');

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
    // 1. Buscar en caché
    const [cache] = await db.execute(
      `SELECT datos, actualizado_en FROM cache_financiero
       WHERE simbolo = ? AND tipo = ?
       AND actualizado_en > NOW() - INTERVAL ? HOUR`,
      [simbolo, tipo, CACHE_HORAS]
    );

    let datos;
    if (cache.length > 0) {
      datos = cache[0].datos; // viene como objeto por mysql2
    } else {
      // 2. Llamar a Alpha Vantage
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'INCOME_STATEMENT',
          symbol: simbolo,
          apikey: process.env.ALPHA_VANTAGE_KEY,
        },
      });
      datos = response.data;

      // 3. Guardar en caché
      await db.execute(
        `INSERT INTO cache_financiero (simbolo, tipo, datos)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE datos = VALUES(datos), actualizado_en = NOW()`,
        [simbolo, tipo, JSON.stringify(datos)]
      );
    }

    // 4. Guardar en historial si hay usuario autenticado
    if (req.usuario) {
      await db.execute(
        'INSERT INTO historial_busquedas (usuario_id, simbolo) VALUES (?, ?)',
        [req.usuario.id, simbolo]
      );
    }

    res.json(datos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener datos financieros' });
  }
});

// GET /api/financiero/historial — historial del usuario
router.get('/usuario/historial', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No autenticado' });

  try {
    const jwt = require('jsonwebtoken');
    const usuario = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    const [rows] = await db.execute(
      `SELECT simbolo, buscado_en FROM historial_busquedas
       WHERE usuario_id = ? ORDER BY buscado_en DESC LIMIT 20`,
      [usuario.id]
    );
    res.json(rows);
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
});

module.exports = router;