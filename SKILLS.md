# 🛠️ SKILLS Y AJUSTES DEL PROYECTO

## 1. Reglas de Ajuste Backend
* **Respuesta Estándar JSON:** Asegurar que todas las respuestas de error devuelvan `{ message: "Descripción" }` con códigos HTTP adecuados (200, 201, 400, 404, 500).
* **CORS y Seguridad:** Configurar `cors()` para permitir peticiones transversales desde el dominio del Frontend en Vercel.

## 2. Ajustes Responsive & Mobile-First (Frontend)
* **Viewport Flex/Grid:** Ajustar contenedores con `w-full max-w-4xl mx-auto px-4` para evitar desbordamiento horizontal en móviles.
* **Manejo de Cartas en Pantallas Pequeñas:** Redimensionar visualmente las cartas de juego utilizando clases dinámicas de Tailwind (`w-24 h-36 md:w-32 md:h-48`).
### 🎴 Diseño de Cartas y Lógica de Juego
- **Sin dependencias de imágenes externas:** Se diseñó un algoritmo helper en JavaScript que genera dinámicamente la baraja utilizando símbolos Unicode nativos (`♠`, `♥`, `♦`, `♣`).
- **Renderizado UI:** La interfaz visual de la carta se construyó desde cero con React y Tailwind CSS, optimizando el rendimiento, la escalabilidad responsive y evitando llamadas externas a assets gráficos.
* **Tipografía y Botones Táctiles:** Garantizar `touch-target` mínimo de 44px en botones de navegación y acciones ("MAYOR", "MENOR").