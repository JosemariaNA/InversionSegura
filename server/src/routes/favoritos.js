const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const supabase = require('../db');

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

// GET /api/favoritos — obtener favoritos del usuario
router.get('/', autenticar, async (req, res) => {
  const { data: rows, error } = await supabase
    .from('favoritos')
    .select('simbolo, nombre_empresa, agregado_en')
    .eq('usuario_id', req.usuario.id);

  if (error) return res.status(500).json({ error: 'Error al obtener favoritos' });
  res.json(rows);
});

// POST /api/favoritos — agregar o actualizar favorito
router.post('/', autenticar, async (req, res) => {
  const { simbolo, nombre_empresa } = req.body;
  try {
    const { error } = await supabase
      .from('favoritos')
      .upsert(
        [{
          usuario_id: req.usuario.id,
          simbolo: simbolo.toUpperCase(),
          nombre_empresa: nombre_empresa || null,
        }],
        { onConflict: 'usuario_id,simbolo' } // UNIQUE (usuario_id, simbolo)
      );

    if (error) throw error;
    res.status(201).json({ mensaje: 'Favorito guardado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar favorito' });
  }
});

// DELETE /api/favoritos/:simbolo — eliminar favorito
router.delete('/:simbolo', autenticar, async (req, res) => {
  const { error } = await supabase
    .from('favoritos')
    .delete()
    .eq('usuario_id', req.usuario.id)
    .eq('simbolo', req.params.simbolo.toUpperCase());

  if (error) return res.status(500).json({ error: 'Error al eliminar favorito' });
  res.json({ mensaje: 'Favorito eliminado' });
});

module.exports = router;