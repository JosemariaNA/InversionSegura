const express = require('express'); // Framework para crear el servidor HTTP
const cors = require('cors'); // Middleware para permitir solicitudes desde el frontend (CORS)
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

// Importar el pool de conexiones a la base de datos
const app = express();
const PORT = process.env.PORT || 3000;
 
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  'https://inversion-segura.vercel.app',
  'http://localhost:5173', 
  'http://localhost:3000'
];

// Middleware (que se ejecuta antes de las rutas)
app.use(cors({
  origin: function(origin, callback) {
    // Permitir solicitudes sin origen (como las de Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Rutas
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/financiero', require('./routes/financiero'));
app.use('/api/favoritos',  require('./routes/favoritos'));
app.use('/api/control',    require('./routes/control'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor HighSpec funcionando ✅' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});