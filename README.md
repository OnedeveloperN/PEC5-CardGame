# 🎴 High-Low Card Game (Mayor o Menor) - PEC 05

Aplicación web Full-Stack interactiva basada en el clásico juego de cartas **"Mayor o Menor"**. Desarrollada con arquitectura desacoplada (Frontend en React y Backend en Express) con persistencia de datos en MongoDB Atlas mediante un CRUD completo de puntuaciones y ranking de jugadores.

---

## 🔗 Enlaces de Despliegue y Repositorio

* **Frontend Live:** [https://tu-frontend.vercel.app](https://tu-frontend.vercel.app) *(Reemplaza con tu URL de Vercel)*
* **Backend API Live:** [https://tu-backend.vercel.app/api/games](https://tu-backend.vercel.app/api/games) *(Reemplaza con tu URL de Vercel)*
* **Repositorio GitHub:** [https://github.com/tu-usuario/pec05-cardgame](https://github.com/tu-usuario/pec05-cardgame)

---

## 🛠️ Stack Tecnológico

### Frontend
* **React 19 + Vite:** SPA rápida y reactiva.
* **Tailwind CSS v4:** Estilizado modular, moderno y 100% Responsive (*Mobile-First*).
* **Lucide React:** Iconografía moderna.
* **Canvas Confetti:** Efectos de celebración al alcanzar rachas de aciertos.

### Backend & Base de Datos
* **Node.js & Express:** API RESTful desacoplada.
* **Mongoose & MongoDB Atlas:** Modelado de datos de partidas y persistencia en la nube.
* **Dotenv & CORS:** Configuración segura de variables de entorno y headers de acceso.

---

## 🎴 Arquitectura del Juego y Decisiones de Diseño

1. **Lógica de Mazo Autónoma (Sin dependencias externas de imágenes):**
   * Se desarrolló un algoritmo helper (`src/utils/deck.js`) que genera y mezcla dinámicamente un mazo estándar de 52 cartas.
   * Utiliza símbolos Unicode nativos (`♠`, `♥`, `♦`, `♣`) y valores numéricos asignados (2 al 14) para la lógica de comparación.
2. **Diseño de Cartas UI (`src/components/Card.jsx`):**
   * Renderizado 100% vectorizado e implementado en React/Tailwind CSS, optimizando los tiempos de carga en dispositivos móviles y evitando llamadas a *assets* externos.
3. **Flujo CRUD de la Entidad Principal (`Game`):**
   * **Create (`POST`):** Guarda la partida, racha de aciertos alcanzada y un comentario opcional del jugador.
   * **Read (`GET`):** Obtiene el ranking ordenado de mejores puntuaciones.
   * **Update (`PUT`):** Permite al usuario editar su comentario o nota de partida directamente desde la interfaz.
   * **Delete (`DELETE`):** Permite eliminar un registro de la base de datos de MongoDB.

---

## 📁 Archivos de Configuración e IA

En cumplimiento con los requerimientos de la PEC, la raíz del proyecto incluye los siguientes archivos de documentación:

* `PLAN.md`: Historial completo del proyecto (*Project Log*) y planificación por fases.
* `AGENTS.md`: Definición explícita de las herramientas de IA (Gemini) y los roles de agentes especializados (*Backend-Agent*, *Frontend-Agent*, *QA-Agent*).
* `SKILLS.md`: Reglas de arquitectura, diseño Responsive, prompts clave y refactorizaciones.
* `TASKS.md`: Seguimiento detallado de tareas completadas.
* `.gitignore` & `.gitattributes`: Normalización de saltos de línea y exclusión de archivos sensibles/compilados.
* `backend/tests.http` & `backend/postman_collection.json`: Archivos de pruebas de endpoints.

---

## 🤖 Uso de Inteligencia Artificial (Gemini) y Reflexión Crítica

Para el desarrollo de esta PEC 05 se utilizó **Gemini** (Google) como asistente interactivo durante todo el proceso de arquitectura, depuración y documentación.

### Prompts Clave Utilizados
1. *"Crea un esquema de Mongoose para la entidad Game con campos para jugador, score y comentarios."*
2. *"Genera un helper en JavaScript para crear y mezclar un mazo estándar de 52 cartas con valores numéricos para comparación."*
3. *"Crea un componente Leaderboard en React con Tailwind CSS que permita listar, editar y eliminar registros de MongoDB."*

### Reflexión Crítica
* **Aceleración del desarrollo:** La IA agilizó notablemente la escritura del *boilerplate* del servidor Express, las operaciones CRUD en Mongoose y la maquetación inicial con Tailwind CSS.
* **Supervisión y corrección manual:** 
  * Se corrigió la importación del plugin de React en `vite.config.js` (`@vitejs/plugin-react`).
  * Se simplificó la entidad principal eliminando el campo de dificultad para centrar la experiencia de usuario en la racha continua de aciertos.
  * Se adaptó el frontend para gestionar variables de entorno dinámicas (`VITE_API_URL`) para asegurar una transición fluida entre el entorno de desarrollo local y producción en Vercel.

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
* Node.js (v18+)
* Cuenta y Cluster configurado en MongoDB Atlas

### 1. Backend Setup
```bash
cd backend
npm install