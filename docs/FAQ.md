# Preguntas Frecuentes (FAQ)

### 1. ¿Por qué la aplicación no muestra datos cuando busco un ticker?
Probablemente has superado el límite de peticiones del plan gratuito de Alpha Vantage (25 peticiones al día, según cambios recientes de su política). Verifica en la terminal del backend si la API externa está respondiendo con un error de cuota.

### 2. ¿Puedo cambiar la base de datos a MongoDB o MySQL?
El proyecto está fuertemente integrado con Supabase (PostgreSQL) para aprovechar su sistema de autenticación integrado. Cambiar a otra base de datos requerirá reescribir toda la lógica de autenticación y las consultas en `/server/src/routes/favoritos.js` (o equivalente).

### 3. ¿Cómo actualizo la clave de Alpha Vantage?
Si necesitas cambiar tu API key, dirígete a `server/.env`, actualiza el valor de `ALPHA_VANTAGE_KEY` y reinicia el servidor backend (`npm run dev`).

### 4. ¿Dónde configuro el puerto del backend?
El puerto puede configurarse en el archivo `.env` del servidor usando la variable `PORT`. Por defecto, está en `3000`. Recuerda actualizar también el frontend (`VITE_API_URL`) si cambias este puerto.
