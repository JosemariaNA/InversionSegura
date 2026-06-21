# 📊 Analizador de Estados Financieros Bursátiles

Proyecto desarrollado para el curso de **Ingeniería de Costos** en la **Universidad Nacional de Cañete**.

Una aplicación web diseñada para consultar, analizar e interpretar el estado de resultados y métricas financieras de empresas que cotizan en bolsa. El sistema extrae datos en tiempo real mediante la API de Alpha Vantage y los presenta en un panel interactivo para facilitar la toma de decisiones.

## 🚀 Características Principales

- **Búsqueda Global:** Consulta de cualquier empresa que cotice en bolsa mediante su símbolo (Ticker).
- **Análisis de Estado de Resultados:** Visualización clara de ingresos, costos, gastos operativos, utilidad bruta y utilidad neta.
- **Flujo de Caja y Métricas:** Interpretación rápida de la salud financiera de la empresa.
- **Interfaz Intuitiva:** Gráficos y tablas diseñadas para facilitar el análisis financiero sin sobrecarga de información.

## 👥 Integrantes del Equipo

Este proyecto fue desarrollado de manera colaborativa por:

- **Lazaro Barrientos Eduardo Enrique** - *[Rol, Frontend / Backend / QA / Documentación]* - [GitHub](https://github.com/)
- **Napan Aparcana Josemaria** - *[Rol, Frontend / Backend / QA / Documentación]* - [GitHub](https://github.com/JosemariaNA)
- **Rocha Luna Junior Duvan** - *[Rol, Frontend / Backend / QA / Documentación]* - [GitHub](https://github.com/JunRoLu-byte)

## 🏗️ Arquitectura del Proyecto

El repositorio está dividido en tres módulos principales para mantener un código limpio y escalable:

- `/web` **(Frontend):** Interfaz de usuario interactiva. Encargada de la visualización de datos y gráficos.
- `/server` **(Backend):** API REST. Actúa como intermediario seguro entre el frontend y Alpha Vantage, manejando la lógica de negocio y la protección de las credenciales (API Keys).
- `/docs` **(Documentación):** Manuales de usuario, diagramas de arquitectura, y documentación de endpoints para el equipo de desarrollo y evaluación universitaria.

## ⚙️ Requisitos Previos

- [Node.js](https://nodejs.org/) (v16 o superior)
- Clave de API gratuita de [Alpha Vantage](https://www.alphavantage.co/)

## 🛠️ Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/JosemariaNA/InversionSegura](https://github.com/JosemariaNA/InversionSegura)
   cd tu-repositorio