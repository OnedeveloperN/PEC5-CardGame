# 🎴 PLAN Y HISTORIAL DEL PROYECTO: High-Low Card Game

## 1. Objetivo y Alcance
Desarrollar una mini aplicación full-stack interactiva ("Mayor o Menor") con persistencia de datos en MongoDB Atlas mediante un CRUD completo.

## 2. Entidad Principal (`Game`)
- `player` (String, requerido)
- `score` (Number, por defecto 0)
- `comment` (String, opcional)
- `createdAt` / `updatedAt` (Timestamps automáticos)

## 3. Historial de Cambios y Progreso (Project Log)
* **[Paso 1] - Inicialización:** Creación del repositorio Git, configuración de `.gitignore` y `.gitattributes`.
* **[Paso 2] - Definición del proyecto:** Redacción de archivos de agentes, skills, plan e historial.
* **[Paso 3] - Backend Setup:** Configuración de Node.js, Express, Mongoose y variables de entorno (`.env`).
* **[Paso 4] - CRUD de Juegos:** Creación de rutas HTTP (`GET`, `POST`, `PUT`, `DELETE`) para el modelo `Game`.
* **[Paso 5] - Frontend & UI:** Implementación de interfaz Responsive con React 19 y Tailwind CSS v4.
* **[Paso 6] - Testing & Deploy:** Pruebas con archivos `.http` / Postman y despliegue en Vercel.