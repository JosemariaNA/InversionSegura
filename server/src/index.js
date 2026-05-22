const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/financiero', require('./routes/financiero'));
app.use('/api/favoritos',  require('./routes/favoritos'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor InversionSegura funcionando ✅' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});