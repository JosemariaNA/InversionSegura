# Uso del Sistema

Esta guía describe cómo levantar el entorno de desarrollo de **InversiónSegura** y cómo utilizar sus funcionalidades principales.

## 1. Ejecutar el Proyecto

El proyecto consta de dos partes que deben ejecutarse simultáneamente: el backend (servidor) y el frontend (cliente).

### Iniciar el Servidor (Backend)
Abre una terminal y ejecuta:
```bash
cd server
npm run dev
```
El servidor debería iniciar en `http://localhost:3000`.

### Iniciar el Cliente (Frontend)
Abre otra terminal y ejecuta:
```bash
cd web
npm run dev
```
La aplicación web debería estar disponible en `http://localhost:5173`.

## 2. Funcionalidades Principales

- **Registro y Autenticación:** 
  Crea una cuenta utilizando tu correo electrónico y una contraseña segura. Esto habilitará el historial de búsquedas y funcionalidades adicionales personalizadas.
  
- **Búsqueda de Empresas (Tickers):**
  En el panel principal (Dashboard), puedes utilizar la barra de búsqueda para consultar una empresa mediante su *Ticker* bursátil (por ejemplo: `AAPL`, `MSFT`, `TSLA`).
  
- **Análisis de Estados Financieros:**
  Una vez realizada la búsqueda, la aplicación presentará paneles interactivos con información de la empresa, incluyendo:
  - Ingresos brutos y netos.
  - Utilidad y márgenes (EBITDA).
  - Gastos operativos y costos asociados.
  
- **Historial de Búsquedas:**
  El sistema registra automáticamente las últimas consultas realizadas (asociadas a tu cuenta) para facilitar el acceso rápido a las empresas frecuentes.
