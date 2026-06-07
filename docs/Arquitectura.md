# Arquitectura y Documentación Técnica - InversiónSegura (ClonFinan)

## 1. Visión General del Sistema
**InversiónSegura** (previamente conocido como ClonFinan) es una aplicación web full-stack orientada al análisis de estados financieros bursátiles. Permite a los usuarios consultar, visualizar e interpretar métricas contables y de rendimiento de empresas públicas a nivel mundial utilizando datos en tiempo real. 

El proyecto adopta una **arquitectura cliente-servidor (3 niveles)** con separación estricta de responsabilidades, garantizando modularidad, seguridad en el manejo de API Keys y una experiencia de usuario altamente responsiva.

---

## 2. Diagrama de Arquitectura

La arquitectura se fundamenta en los siguientes componentes principales:

```mermaid
graph TD
    %% Entidades de Usuario
    User[👤 Usuario / Inversor]
    
    %% Frontend
    subgraph Frontend [Capa de Presentación / Cliente (React + Vite)]
        UI[Interfaz Web SPA]
        Graficos[Componentes de Gráficos]
        AuthUI[Formularios de Autenticación]
    end
    
    %% Backend
    subgraph Backend [Capa de Lógica de Negocio / Servidor (Node.js + Express)]
        API[API REST (Express)]
        RouteFin[Rutas: /api/financiero]
        RouteAuth[Rutas: /api/auth]
        RouteFav[Rutas: /api/favoritos]
    end
    
    %% Base de Datos
    subgraph DB [Capa de Persistencia y Auth (Supabase)]
        SupabaseAuth[Supabase Authentication]
        SupabaseDB[(PostgreSQL - Favoritos y Usuarios)]
    end
    
    %% API Externa
    subgraph ExternalAPI [Proveedores de Datos Externos]
        AlphaV[Alpha Vantage API]
    end

    %% Relaciones y Flujos de Datos
    User -->|Interactúa| UI
    UI -->|Peticiones HTTP/JSON| API
    UI -.->|Renderiza datos| Graficos
    UI -.->|Login/Registro| AuthUI
    
    API -->|Rutea| RouteFin
    API -->|Rutea| RouteAuth
    API -->|Rutea| RouteFav

    RouteFin -->|Petición segura (Oculta Key)| AlphaV
    RouteAuth <-->|Valida/Crea| SupabaseAuth
    RouteFav <-->|CRUD Favoritos| SupabaseDB
    
    AlphaV -->|Devuelve JSON Financiero| RouteFin
    RouteFin -->|Transforma y Formatea| UI
```

---

## 3. Stack Tecnológico

| Capa | Tecnologías Utilizadas | Propósito / Justificación |
|------|-----------------------|---------------------------|
| **Frontend** | **React 18, Vite** | Creación de una Single Page Application (SPA) ágil, rápida y con recargas en caliente. |
| **Estilos/UI** | **CSS3, Módulos CSS** | Estilización de componentes y diseño responsivo sin sobrecarga de frameworks externos pesados. |
| **Visualización** | **Recharts / Chart.js** (Según implementación) | Renderizado de gráficos interactivos para EBITDA, Márgenes, Ingresos, etc. |
| **Backend** | **Node.js, Express** | Creación de una API REST eficiente, proxy seguro para ocultar claves de la API externa y control de CORS. |
| **Base de Datos** | **Supabase (PostgreSQL)** | Gestión de base de datos relacional en la nube para persistencia de datos (favoritos) y autenticación rápida. |
| **API Externa** | **Alpha Vantage** | Proveedor de datos bursátiles, estado de resultados e informes financieros globales. |

---

## 4. Estructura de Directorios del Proyecto

El repositorio sigue un patrón de monorepo lógico dividido en tres módulos fundamentales:

```text
📦 ClonFinan (InversiónSegura)
 ┣ 📂 docs/               # Documentación técnica y requerimientos (Markdown, Diagramas)
 ┣ 📂 server/             # Backend (Node.js / Express)
 ┃ ┣ 📂 src/
 ┃ ┃ ┣ 📂 routes/         # Controladores y endpoints (auth.js, financiero.js, favoritos.js)
 ┃ ┃ ┣ 📜 db.js           # Configuración e inicialización del cliente de Supabase
 ┃ ┃ ┗ 📜 index.js        # Punto de entrada principal del servidor Express
 ┃ ┣ 📜 .env              # Variables de entorno secretas (AlphaVantage Key, Supabase Keys)
 ┃ ┗ 📜 package.json      # Dependencias del backend
 ┗ 📂 web/                # Frontend (React / Vite)
   ┣ 📂 public/           # Recursos estáticos (Imágenes, íconos)
   ┣ 📂 src/
   ┃ ┣ 📂 assets/         # Recursos de la app
   ┃ ┣ 📂 components/     # Componentes reutilizables (Navbar, Gráficas, Tarjetas, Loading)
   ┃ ┣ 📂 pages/          # Vistas principales (Dashboard, Empresa, Login, Registro)
   ┃ ┣ 📜 api.js          # Configuración del cliente Axios / Fetch hacia el backend
   ┃ ┣ 📜 App.jsx         # Enrutamiento principal del frontend
   ┃ ┗ 📜 main.jsx        # Punto de entrada de React
   ┣ 📜 vite.config.js    # Configuración del bundler Vite
   ┗ 📜 package.json      # Dependencias del frontend
```

---

## 5. Diseño de Componentes (Frontend)

El frontend está orientado a componentes, separando la lógica de vista y la lógica de negocio temporal.

- **Páginas (`/pages`)**:
  - `Dashboard.jsx`: Vista principal de inicio, donde el usuario visualiza su portafolio o un resumen.
  - `Empresa.jsx`: El núcleo analítico. Renderiza el desglose financiero de una empresa específica buscada por Ticker.
  - `Login.jsx` & `Registro.jsx`: Vistas de autenticación de acceso.

- **Componentes (`/components`)**:
  - **Gráficos Específicos:** `GraficaEBITDA.jsx`, `GraficaIngresos.jsx`, `GraficaMargenes.jsx`, etc. Modularizan la visualización de datos complejos en piezas digeribles.
  - **Tablas y Tarjetas:** `TablaEstadoResultados.jsx`, `TarjetaMetrica.jsx` para mostrar información cuantitativa rápida.
  - **Globales:** `Navbar.jsx` (Navegación), `LoadingSpinner.jsx` (Feedback de estado).

---

## 6. Diseño de la API (Backend)

El backend actúa como un **Proxy Inverso** e intermediario de seguridad. Consta de tres enrutadores principales (`/server/src/routes/`):

1. **`auth.js` (`/api/auth`)**
   - Maneja el inicio de sesión y registro comunicándose con Supabase Auth.
   - Retorna tokens y datos de sesión al cliente.

2. **`financiero.js` (`/api/financiero`)**
   - **Endpoint Crítico.** Recibe el *Ticker* del cliente y realiza una petición interna HTTP hacia la API de Alpha Vantage inyectando la `API_KEY` guardada en el `.env`.
   - Limpia, procesa y formatea el voluminoso JSON de Alpha Vantage en una estructura simplificada (Ingresos, EBITDA, Utilidad Neta) antes de mandarla al frontend.

3. **`favoritos.js` (`/api/favoritos`)**
   - Interfaz con Supabase (PostgreSQL) para operaciones CRUD sobre las empresas favoritas de cada usuario logueado.

---

## 7. Flujos de Trabajo Principales

### 7.1. Flujo de Consulta Financiera (Caso de Uso Central)
1. El usuario introduce un *Ticker* (Ej. "AAPL") en el buscador (`Empresa.jsx`).
2. El Frontend emite una petición `GET /api/financiero/empresa/AAPL`.
3. El Backend recibe la petición, valida los datos, y hace una llamada a la URL externa de Alpha Vantage (adjuntando su llave privada).
4. El Backend recibe la respuesta externa, extrae el *Income Statement* y calcula métricas clave.
5. El Frontend recibe los datos formateados y los distribuye como *props* a los componentes de Gráficas (`GraficaIngresos`, `GraficaMargenes`, etc.).

### 7.2. Flujo de Autenticación
1. El usuario llena el formulario en `Registro.jsx` o `Login.jsx`.
2. Se envía un `POST /api/auth/login` con email y contraseña.
3. El Backend usa el SDK de Supabase (`db.js`) para autenticar al usuario.
4. Si es exitoso, devuelve al Frontend la información del usuario y token, redirigiendo al `Dashboard.jsx`.

---

## 8. Seguridad y Manejo de Entorno

- **Ocultamiento de Credenciales:** La API Key de Alpha Vantage y la Service Role Key de Supabase residen **exclusivamente en el Backend** (`/server/.env`). El frontend NUNCA hace peticiones directas a la API externa.
- **CORS Configurado:** El backend implementa el middleware `cors()` limitando el origen de las peticiones para prevenir solicitudes de dominios no autorizados.
- **Validación Temprana:** Al arrancar el servidor (`db.js`), el sistema valida inmediatamente la existencia de las variables de entorno de la base de datos, abortando el inicio y emitiendo un log claro si hay omisiones, lo cual previene fallos crípticos en tiempo de ejecución.

---

## 9. Despliegue (Consideraciones Futuras)

Para llevar este proyecto a producción:
- **Frontend (Vite/React):** Puede construirse estáticamente mediante `npm run build` y alojarse en CDNs rápidos y gratuitos como **Vercel** o **Netlify**.
- **Backend (Node/Express):** Requiere un entorno de ejecución Node.js (Ej. **Render**, **Railway**, o **Heroku**). Se deben configurar las variables de entorno adecuadamente en el panel del proveedor.
- **Base de Datos:** **Supabase** ya reside en la nube (DBaaS), por lo que solo se requiere asegurar las políticas (RLS) en caso de exponer credenciales anónimas.
