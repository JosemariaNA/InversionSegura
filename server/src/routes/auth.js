// Rutas de autenticación: registro y login
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../db');

// POST /api/auth/registro
router.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password)
    return res.status(400).json({ error: 'Faltan campos obligatorios' });

  try {
    const hash = await bcrypt.hash(password, 10);

    const { error } = await supabase
      .from('usuarios')
      .insert([{ nombre, email, password_hash: hash }]);

    if (error) {
      // Código 23505 = unique_violation en PostgreSQL (email duplicado)
      if (error.code === '23505')
        return res.status(409).json({ error: 'El email ya está registrado' });
      throw error;
    }

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Faltan campos obligatorios' });

  try {
    const { data: usuarios, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .limit(1);

    if (error) throw error;
    if (!usuarios || usuarios.length === 0)
      return res.status(401).json({ error: 'Credenciales inválidas' });

    const usuario = usuarios[0];
    const valido = await bcrypt.compare(password, usuario.password_hash);
    if (!valido)
      return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ token, nombre: usuario.nombre });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Middleware estricto para verificar token
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

// GET /api/auth/perfil
router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('nombre, email, avatar_url, telefono')
      .eq('id', req.usuario.id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
});

// PUT /api/auth/perfil
router.put('/perfil', verificarToken, async (req, res) => {
  const { nombre, email, telefono, avatar_url, passwordActual, passwordNueva } = req.body;

  try {
    if (passwordNueva) {
      if (!passwordActual) return res.status(400).json({ error: 'Debe proporcionar la contraseña actual para cambiarla' });

      const { data: usuario, error: fetchErr } = await supabase
        .from('usuarios')
        .select('password_hash')
        .eq('id', req.usuario.id)
        .single();
        
      if (fetchErr) throw fetchErr;

      const valido = await bcrypt.compare(passwordActual, usuario.password_hash);
      if (!valido) return res.status(401).json({ error: 'La contraseña actual es incorrecta' });

      const hash = await bcrypt.hash(passwordNueva, 10);
      
      const { error } = await supabase
        .from('usuarios')
        .update({ nombre, email, telefono, avatar_url, password_hash: hash })
        .eq('id', req.usuario.id);
        
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('usuarios')
        .update({ nombre, email, telefono, avatar_url })
        .eq('id', req.usuario.id);
        
      if (error) throw error;
    }

    res.json({ mensaje: 'Perfil actualizado correctamente' });
  } catch (err) {
    console.error(err);
    if (err.code === '23505') return res.status(409).json({ error: 'El email ya está en uso' });
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
});

module.exports = router;