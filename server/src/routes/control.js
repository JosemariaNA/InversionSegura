const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const supabase = require('../db');

// Middleware estricto para verificar token (reutilizado o copiado)
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No autorizado' });

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

// GET /api/control
// Obtener todas las transacciones del usuario
router.get('/', verificarToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('transacciones_financieras')
      .select('*')
      .eq('usuario_id', req.usuario.id)
      .order('fecha', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
});

// POST /api/control
// Crear nueva transacción
router.post('/', verificarToken, async (req, res) => {
  const { concepto, tipo, monto, fecha } = req.body;

  if (!concepto || !tipo || !monto || !fecha) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const { data, error } = await supabase
      .from('transacciones_financieras')
      .insert([{
        usuario_id: req.usuario.id,
        concepto,
        tipo,
        monto: parseFloat(monto),
        fecha
      }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar la transacción' });
  }
});

// DELETE /api/control/:id
// Eliminar transacción
router.delete('/:id', verificarToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar que la transacción pertenezca al usuario (o simplemente filtrar por usuario_id en supabase)
    const { data, error } = await supabase
      .from('transacciones_financieras')
      .delete()
      .eq('id', id)
      .eq('usuario_id', req.usuario.id);

    if (error) throw error;
    res.json({ mensaje: 'Transacción eliminada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar la transacción' });
  }
});

module.exports = router;
