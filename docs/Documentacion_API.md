# Documentación de la API (Backend) - InversiónSegura

Este documento detalla los endpoints expuestos por la API REST del servidor (`/server`) construido con Node.js y Express.

URL Base de desarrollo: `http://localhost:3000/api`

---

## 1. Autenticación (`/api/auth`)

### 1.1 Registro de Usuario
Crea un nuevo usuario en la base de datos de Supabase. La contraseña es encriptada antes de almacenarse utilizando `bcryptjs`.

- **Método:** `POST`
- **Ruta:** `/auth/registro`
- **Cuerpo de la Petición (JSON):**
  ```json
  {
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "passwordSeguro123"
  }
  ```
- **Respuestas:**
  - `201 Created`: `{"mensaje": "Usuario registrado correctamente"}`
  - `400 Bad Request`: `{"error": "Faltan campos obligatorios"}`
  - `409 Conflict`: `{"error": "El email ya está registrado"}`

### 1.2 Inicio de Sesión
Valida las credenciales del usuario y retorna un JSON Web Token (JWT) válido por 8 horas.

- **Método:** `POST`
- **Ruta:** `/auth/login`
- **Cuerpo de la Petición (JSON):**
  ```json
  {
    "email": "juan@example.com",
    "password": "passwordSeguro123"
  }
  ```
- **Respuestas:**
  - `200 OK`: `{"token": "eyJhbGciOi...", "nombre": "Juan Pérez"}`
  - `401 Unauthorized`: `{"error": "Credenciales inválidas"}`

---

## 2. Datos Financieros (`/api/financiero`)

### 2.1 Búsqueda de Estado de Resultados (Por Ticker)
Consulta el estado de resultados de una empresa utilizando su símbolo bursátil. El servidor busca primero en la caché de la base de datos (válida por `CACHE_HORAS` configurable, default 24h). Si no existe o caducó, se consulta la API de Alpha Vantage y se guarda en caché.

- **Método:** `GET`
- **Ruta:** `/financiero/:simbolo`
- **Parámetros de Ruta:** `:simbolo` (Ej. `AAPL`, `MSFT`)
- **Headers (Opcional):**
  - `Authorization: Bearer <token_jwt>` (Si se envía, el backend guardará automáticamente la búsqueda en el historial del usuario).
- **Respuestas:**
  - `200 OK`: Devuelve el JSON puro de Alpha Vantage (Income Statement) o extraído de la caché.
  - `500 Internal Server Error`: `{"error": "Error al obtener datos financieros"}`

### 2.2 Obtener Historial de Búsquedas
Devuelve las últimas 20 búsquedas realizadas por el usuario autenticado.

- **Método:** `GET`
- **Ruta:** `/financiero/usuario/historial`
- **Headers Requeridos:**
  - `Authorization: Bearer <token_jwt>`
- **Respuestas:**
  - `200 OK`: 
    ```json
    [
      {
        "simbolo": "AAPL",
        "buscado_en": "2023-10-01T14:30:00Z"
      },
      {
        "simbolo": "TSLA",
        "buscado_en": "2023-10-01T12:00:00Z"
      }
    ]
    ```
  - `401 Unauthorized`: `{"error": "No autenticado"}` o `{"error": "Token inválido"}`

---

## 3. Comprobación de Salud (`/`)

### 3.1 Ping del Servidor
Comprueba que el servidor Express esté en ejecución y aceptando peticiones.

- **Método:** `GET`
- **Ruta:** `/` (Raíz del puerto, no bajo `/api`)
- **Respuestas:**
  - `200 OK`: `{"mensaje": "Servidor InversionSegura funcionando ✅"}`

---

## Seguridad y Headers

- Para cualquier endpoint protegido se debe enviar el header: `Authorization: Bearer EL_TOKEN_JWT`.
- Las peticiones desde el frontend de desarrollo (`localhost:5173`) hacia el backend (`localhost:3000`) están habilitadas mediante el middleware `cors()`.
- La API de Alpha Vantage nunca es expuesta al cliente. La solicitud externa desde el backend inyecta de forma secreta la variable `process.env.ALPHA_VANTAGE_KEY`.
