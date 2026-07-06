# Configuración

Para el correcto funcionamiento del proyecto, es necesario establecer variables de entorno tanto para el frontend como para el backend.

## 1. Configuración del Servidor (Backend)

Crea un archivo llamado `.env` en la raíz de la carpeta `server/` con el siguiente contenido:

```env
# Puerto del servidor backend
PORT=3000

# Clave de la API de Alpha Vantage
ALPHA_VANTAGE_KEY=tu_clave_de_alpha_vantage_aqui

# Credenciales de Supabase
SUPABASE_URL=https://tu_proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_rol_de_servicio_aqui
```

> **Nota:** La `SUPABASE_SERVICE_ROLE_KEY` otorga permisos de administrador. Nunca debe exponerse en el lado del cliente (Frontend).

## 2. Configuración del Cliente (Frontend)

Crea un archivo llamado `.env` en la raíz de la carpeta `web/` con el siguiente contenido:

```env
# URL base de la API del servidor local
VITE_API_URL=http://localhost:3000/api
```

## 3. Configuración de Base de Datos (Supabase)

Debes inicializar las tablas necesarias en Supabase. Puedes encontrar el script SQL necesario para ejecutar en el panel de Supabase en [BASE_DE_DATOS.md](./BASE_DE_DATOS.md).
