const express = require('express'); // Framework para crear el servidor HTTP
const cors = require('cors'); // Middleware para permitir solicitudes desde el frontend (CORS)
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

// Importar el pool de conexiones a la base de datos
const app = express();
const PORT = process.env.PORT || 3000;
 
// Middleware (que se ejecuta antes de las rutas)
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

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});