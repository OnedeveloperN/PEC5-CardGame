# 🤖 DEFINICIÓN DE AGENTES Y HERRAMIENTAS DE IA

## Herramienta Utilizada
* **Modelo de IA:** Gemini (Google) / Copiloto de desarrollo Full-Stack.

## Agentes y Prompts Especializados

En este proyecto se interactuó con Gemini definiendo roles de agentes especializados para cada fase del desarrollo:

### 1. Agente Backend & Base de Datos (`Backend-Agent`)
* **Rol:** Arquitecto de APIs REST y Mongoose.
* **Misión:** Diseñar el modelo de datos `Game`, configurar la conexión limpia a MongoDB Atlas y estructurar los controladores CRUD con manejo de errores en Express.

### 2. Agente Frontend & UI/UX (`Frontend-Agent`)
* **Rol:** Desarrollador Senior de React & Designer.
* **Misión:** Implementar la lógica del mazo de cartas (generación y mezcla), componentes visuales fluidos (`Card`, `Leaderboard`) y diseño responsive con Tailwind CSS v4.

### 3. Agente QA & Code Reviewer (`QA-Agent`)
* **Rol:** Ingeniero de Calidad y Refactorización.
* **Misión:** Generación de archivos de pruebas `.http` y `.postman.json`, resolución de errores de importación en Vite (`@vitejs/plugin-react`) y verificación del flujo de datos en tiempo real.