// Rutas de autenticación: registro y login
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// POST /api/auth/registro
router.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body; // Validación básica
  if (!nombre || !email || !password)
    return res.status(400).json({ error: 'Faltan campos obligatorios' });

  try {
    const hash = await bcrypt.hash(password, 10);
    await db.execute(
      'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)', // Inserta el nuevo usuario en la base de datos
      [nombre, email, hash]
    );
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' }); // Respuesta exitosa
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ error: 'El email ya está registrado' }); // Manejo de error específico para email duplicado
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body; 
  if (!email || !password) // Validación básica (que no estén vacíos)
    return res.status(400).json({ error: 'Faltan campos obligatorios' });

  try {
    const [rows] = await db.execute(
      'SELECT * FROM usuarios WHERE email = ?', [email] // Busca al usuario por email
    );
    if (rows.length === 0)
      return res.status(401).json({ error: 'Credenciales inválidas' });

    const usuario = rows[0];
    const valido = await bcrypt.compare(password, usuario.password_hash); // Compara la contraseña ingresada con el hash almacenado
    if (!valido)
      return res.status(401).json({ error: 'Credenciales inválidas' }); // Si la contraseña no coincide

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '8h' } // El token expira en 8 horas
    );
    res.json({ token, nombre: usuario.nombre });
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' }); // Manejo de errores genérico
  }
});

module.exports = router;