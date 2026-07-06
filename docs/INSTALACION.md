# Instalación

Esta guía detalla los pasos para instalar el proyecto **InversiónSegura** en tu entorno local.

## Prerrequisitos

Asegúrate de contar con lo siguiente antes de comenzar:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [Git](https://git-scm.com/)
- Una cuenta en [Supabase](https://supabase.com/) (para base de datos y autenticación)
- Una clave de API de [Alpha Vantage](https://www.alphavantage.co/)

## Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JosemariaNA/InversionSegura
   cd InversionSegura
   ```

2. **Instalar dependencias del Backend:**
   Dirígete a la carpeta del servidor e instala los paquetes necesarios.
   ```bash
   cd server
   npm install
   ```

3. **Instalar dependencias del Frontend:**
   Abre una nueva terminal, dirígete a la carpeta del frontend y ejecuta la instalación.
   ```bash
   cd web
   npm install
   ```

Una vez instaladas las dependencias, dirígete a [CONFIGURACION.md](./CONFIGURACION.md) para configurar tus variables de entorno.
