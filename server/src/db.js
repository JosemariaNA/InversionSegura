const path = require('path');
// Cargar .env usando ruta absoluta relativa a este archivo para evitar
// problemas según desde dónde se arranque el proceso
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validación temprana — falla con mensaje claro en lugar de error críptico
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌  ERROR: Faltan variables de entorno de Supabase.');
  console.error('   SUPABASE_URL:', SUPABASE_URL || '(vacío)');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_KEY ? '(presente)' : '(vacío)');
  console.error('   Verifica que el archivo server/.env existe y tiene los valores correctos.');
  process.exit(1);
}

// Cliente Supabase con la key proporcionada
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

console.log('✅  Supabase cliente inicializado →', SUPABASE_URL);

module.exports = supabase;