# Guía de Despliegue

Esta guía describe las consideraciones para llevar el proyecto a producción, cubriendo Vercel y otras plataformas.

## Frontend (Vercel)

El frontend en React/Vite puede ser alojado de manera gratuita y rápida en [Vercel](https://vercel.com).

1. Crea un repositorio en GitHub con el código del proyecto.
2. Inicia sesión en Vercel y selecciona "Add New Project".
3. Importa el repositorio del frontend (`/web`).
4. Configura el comando de build (`npm run build`) y el directorio de salida (`dist`).
5. Añade la variable de entorno `VITE_API_URL` apuntando a la URL pública de tu backend en producción.

## Backend (Render, Heroku, Railway)

La API en Node.js requiere un entorno que ejecute el servidor Express de forma continua.

1. Selecciona un proveedor como Render o Railway.
2. Conecta el repositorio e indica el directorio raíz como `/server`.
3. Configura el comando de inicio (`node src/index.js` o similar).
4. Configura todas las variables de entorno de producción requeridas (`ALPHA_VANTAGE_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).

## Base de Datos (Supabase)

Supabase actúa como una base de datos manejada en la nube (DBaaS), por lo que ya está desplegada. Solo asegúrate de habilitar RLS (Row Level Security) y validar los accesos antes de lanzar a producción.
