# Políticas de Seguridad

La seguridad es primordial en **InversiónSegura**, especialmente por el manejo de claves de API externas y datos de usuarios.

## Gestión de Credenciales

- Las claves de terceros (Alpha Vantage y Supabase Service Role) **nunca** se envían al frontend. Se manejan exclusivamente en el backend (Node.js/Express) mediante el archivo `.env`.
- El frontend y el backend interactúan mediante un proxy interno que enmascara estas solicitudes.

## Autenticación

- Se implementa el sistema de autenticación de **Supabase**, utilizando JSON Web Tokens (JWT) seguros.
- Las contraseñas se almacenan fuertemente encriptadas por Supabase (`bcrypt` nativo).

## Protección contra Ataques Comunes

- **CORS:** El backend restringe los orígenes permitidos únicamente a los dominios del frontend oficial (por ejemplo, `localhost:5173` en desarrollo).
- **Protección de Rutas (RLS):** A nivel de base de datos, Supabase permite aplicar Row Level Security para garantizar que un usuario solo pueda leer e insertar registros en su propio historial.
