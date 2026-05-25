# Documento de Especificación de Requerimientos

**Proyecto:** Analizador de Estados Financieros Bursátiles  
**Curso:** Ingeniería de Costos  
**Institución:** Universidad Nacional de Cañete (UNCA)  

## 👥 Equipo de Desarrollo
- Lazaro Barrientos Eduardo Enrique
- Napan Aparcana Josemaría
- Rocha Luna Junior Duvan

## 1. Introducción y Propósito del Sistema
El presente documento define formalmente la especificación de requerimientos de software para el desarrollo del **Analizador de Estados Financieros Bursátiles**. Este sistema permite realizar consultas eficientes de la salud financiera corporativa a través del procesamiento sistemático de datos bursátiles en tiempo real.

El objetivo principal es proveer una plataforma centralizada que extraiga, procese e interprete de forma automática el estado de resultados y flujos de caja de empresas globales públicas, minimizando la carga conceptual y técnica asociada a la recolección manual de reportes contables.

## 2. Descripción General y Arquitectura
El sistema está estructurado bajo una arquitectura de tres módulos independientes para garantizar modularidad, seguridad y escalabilidad:

- **Frontend (`/web`):** Interfaz gráfica interactiva construida para la visualización ágil de datos contables y generación de gráficos dinámicos de rendimiento.
- **Backend (`/server`):** Capa intermedia estructurada como una API REST que gestiona la lógica de negocio, se comunica de forma segura con Alpha Vantage y resguarda las credenciales de infraestructura.
- **Documentación (`/docs`):** Compendio técnico que abarca diagramas de arquitectura, manuales operativos y contratos de endpoints.

## 3. Requerimientos Funcionales (RF)

| Código | Nombre del Requerimiento | Descripción Detallada | Prioridad |
| :--- | :--- | :--- | :--- |
| **RF-01** | Búsqueda Global por Ticker | El sistema debe proveer una barra de búsqueda en el frontend que acepte el símbolo bursátil (Ticker) de cualquier empresa global y valide su sintaxis antes de enviarlo al servidor. | Crítica |
| **RF-02** | Consumo e Integración de API | El backend del sistema debe conectarse dinámicamente con la API externa de Alpha Vantage para recuperar los estados financieros históricos y corrientes en formato estructurado (JSON). | Crítica |
| **RF-03** | Desglose del Estado de Resultados | El módulo de servidor debe procesar los datos de la API para separar de manera comprensible los ingresos brutos, costos de ventas, gastos operativos (OPEX), utilidad bruta y utilidad neta final. | Alta |
| **RF-04** | Cálculo de Métricas Financieras | La aplicación debe procesar los estados contables extraídos para calcular e interpretar de forma rápida índices financieros de liquidez, rentabilidad y estabilidad del flujo de caja. | Alta |
| **RF-05** | Panel de Control e Interfaz | El frontend debe renderizar los estados financieros organizados mediante tablas limpias y componentes gráficos interactivos, impidiendo la sobrecarga de información técnica. | Media |
| **RF-06** | Aislamiento Seguro (Proxy) | La clave de API (API Key) de Alpha Vantage debe estar completamente aislada en el servidor backend. Ninguna solicitud directa a la API debe realizarse desde el cliente. | Crítica |

## 4. Requerimientos No Funcionales (RNF)

| Código | Atributo de Calidad | Descripción Técnica y Criterio de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- |
| **RNF-01** | Seguridad e Integridad | Todas las credenciales y variables de entorno deben almacenarse de forma cifrada u oculta en el backend, evitando filtraciones en el repositorio. | Crítica |
| **RNF-02** | Mantenibilidad y Estructura | El código fuente debe apegarse estrictamente a la separación modular de carpetas (`/web`, `/server`, `/docs`). | Alta |
| **RNF-03** | Desempeño y Control de Cuotas | El backend debe implementar un manejo controlado de excepciones y reintentos para mitigar la latencia de la API de Alpha Vantage y las restricciones del plan gratuito. | Media |
| **RNF-04** | Usabilidad de la Interfaz | El panel de control debe cargar de manera fluida y presentar un diseño intuitivo apto para estudiantes universitarios, optimizando la jerarquía visual de las métricas. | Alta |
| **RNF-05** | Compatibilidad del Entorno | La infraestructura base del software debe compilar y ejecutarse correctamente utilizando un entorno de ejecución Node.js versión 16 o superior. | Alta |