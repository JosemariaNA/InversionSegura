const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');

// Middleware para autenticar al usuario usando JWT
function autenticar(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No autenticado' });
  try {
    req.usuario = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// GET /api/favoritos
router.get('/', autenticar, async (req, res) => {
  const [rows] = await db.execute(
    'SELECT simbolo, nombre_empresa, agregado_en FROM favoritos WHERE usuario_id = ?', // Solo obtener los favoritos del usuario autenticado
    [req.usuario.id]
  );
  res.json(rows);
});

// POST /api/favoritos
router.post('/', autenticar, async (req, res) => {
  const { simbolo, nombre_empresa } = req.body;
  try {
    await db.execute(
      `INSERT INTO favoritos (usuario_id, simbolo, nombre_empresa)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE nombre_empresa = VALUES(nombre_empresa)`,
      [req.usuario.id, simbolo.toUpperCase(), nombre_empresa || null]
    );
    res.status(201).json({ mensaje: 'Favorito guardado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar favorito' }); // Manejo de errores genérico
  }
});

// DELETE /api/favoritos/:simbolo
router.delete('/:simbolo', autenticar, async (req, res) => {
  await db.execute(
    'DELETE FROM favoritos WHERE usuario_id = ? AND simbolo = ?', // Eliminar el favorito específico del usuario
    [req.usuario.id, req.params.simbolo.toUpperCase()]
  );
  res.json({ mensaje: 'Favorito eliminado' }); // Respuesta genérica, no se verifica si realmente se eliminó algo
});

module.exports = router;