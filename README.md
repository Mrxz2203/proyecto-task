⚙️ Requisitos Previos e InstalaciónRequisitos:Node.js: v16.x o superiornpm: v8.x o superior (o yarn / pnpm)Pasos de Instalación:Clonar el repositorio o ingresar a la carpeta del frontend:Bashcd helptask-front
Instalar las dependencias requeridas:Bashnpm install
🚀 Ejecución en DesarrolloPara levantar el servidor de desarrollo local:Bashnpm start
La aplicación se abrirá automáticamente en http://localhost:3000.🧭 Rutas y NavegaciónRutaComponenteDescripciónProtección/WelcomePágina de bienvenida / Landing Page.Pública/loginLoginFormulario de acceso.Pública/registerRegisterFormulario de registro de usuario.Pública/dashboardDashboardTablero Kanban de gestión de tareas.Protegida (requiere usuario_nombre en localStorage)/footerFooterVista previa aislada del pie de página.Pública💻 Arquitectura de Componentes1. Welcome.js & Welcome.cssPágina de inicio con animación de entrada (show), gráficos responsivos y tira de características destacadas (Kanban Visual, Autenticación, Rapidez, Espacio propio).2. Login.js & Register.jsMódulos de autenticación que manejan validación de campos vacíos, formato de correo y longitud de contraseña. Guardan los datos en el localStorage para simular la persistencia con una API REST.3. Dashboard.jsCore de la aplicación. Coordina el estado de la lista de tareas tareas, filtrándolas según su propiedad estado:pendiente (Color rojo #FF5E7D)en-progreso (Color amarillo #FFB547)completado (Color verde #00D4AA)4. TaskCard.jsTarjeta atómica que muestra el título, descripción y los botones de acción (Editar, Eliminar) con un indicador visual lateral según el estado.5. TaskModal.jsModal superpuesto con soporte para agregar nuevas tareas o actualizar tareas preexistentes seleccionando pills de estado activas.🔒 Autenticación y Estado LocalActualmente el proyecto simula la autenticación mediante el localStorage del navegador:reg_nombre: Nombre del usuario registrado.reg_email: Correo electrónico del usuario registrado.reg_password: Contraseña registrada.usuario_nombre: Token/Clave de sesión activa.En el Dashboard.js, un hook useEffect verifica la presencia de usuario_nombre. Si la clave no está presente, redirige automáticamente a /login.🎨 Guía de Estilos y DiseñoEl sistema visual de HelpTask está basado en un tema oscuro (Dark Mode) configurado en variables CSS:CSS:root {
  --bg:       #0F1117; /* Fondo principal */
  --surface:  #1A1D27; /* Tarjetas y contenedores */
  --surface2: #22263A; /* Tarjetas de tareas */
  --border:   rgba(255,255,255,0.08);
  --accent:   #6C63FF; /* Color de acento (Violeta) */
  --accent2:  #FF6584; /* Acento secundario (Rosa) */
  --red:      #FF5E7D; /* Estado Pendiente */
  --yellow:   #FFB547; /* Estado En Progreso */
  --green:    #00D4AA; /* Estado Completado */
  --text:     #EEEEF5; /* Texto principal */
  --text-sub: #7B7FA8; /* Texto secundario */
}
🛠️ Próximos Pasos (Roadmap)[ ] Integración con Backend real (FastAPI / Node.js).[ ] Implementación de autenticación persistente con JSON Web Tokens (JWT).[ ] Drag and Drop nativo para mover tareas entre columnas Kanban.[ ] Filtros avanzados de búsqueda y etiquetas por prioridad."""file_path = "README.md"with open(file_path, "w", encoding="utf-8") as f:f.write(readme_md_content)print("Archivo README.md generado correctamente.")
```text?code_stdout&code_event_index=1
Archivo README.md generado correctamente.

Aquí tienes el archivo README.md completo y formateado profesionalmente listo para añadirlo a la raíz de tu repositorio de GitHub  README  MD Abierto.Markdown# 🚀 HelpTask Frontend

**HelpTask** es una aplicación web moderna, intuitiva y visual para la gestión de tareas personales y organizacionales en formato **Kanban**. Diseñada con **React** y estilizada de forma nativa mediante CSS3 con variables personalizadas y tipografías modernas (*Syne* y *DM Sans*), ofrece una experiencia de usuario fluida, minimalista y responsiva.

---

## 📋 Tabla de Contenidos

- [📌 Descripción del Proyecto](#-descripción-del-proyecto)
- [✨ Características Principales](#-características-principales)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [⚙️ Requisitos Previos e Instalación](#️-requisitos-previos-e-instalación)
- [🚀 Ejecución en Desarrollo](#-ejecución-en-desarrollo)
- [🧭 Rutas y Navegación](#-rutas-y-navegación)
- [💻 Arquitectura de Componentes](#-arquitectura-de-componentes)
- [🔒 Autenticación y Estado Local](#-autenticación-y-estado-local)
- [🎨 Guía de Estilos y Diseño](#-guía-de-estilos-y-diseño)
- [🛠️ Próximos Pasos (Roadmap)](#️-próximos-pasos-roadmap)

---

## 📌 Descripción del Proyecto

El frontend de **HelpTask** permite a los usuarios registrarse, iniciar sesión y administrar su flujo de trabajo diario a través de un tablero de control interactivo. Las tareas se organizan dinámicamente en tres estados (*Pendiente*, *En Progreso* y *Completado*), permitiendo la creación, edición y eliminación de tareas en tiempo real.

---

## ✨ Características Principales

- **Landing Page Interactiva (`Welcome`)**: Presentación visual del producto con secciones destacadas y vista previa de interfaz.
- **Módulo de Autenticación (`Login` / `Register`)**:
  - Validación de formularios en el cliente.
  - Persistencia de credenciales simulada mediante `localStorage`.
  - Alternancia para mostrar/ocultar contraseña.
- **Tablero Kanban (`Dashboard`)**:
  - Organización de tareas en 3 columnas por estado.
  - Conteo automático de tareas por categoría.
  - Menú desplegable interactivo en el perfil de usuario con protección de rutas (redirección al Login si no hay sesión activa).
- **Gestión de Tareas (CRUD Local)**:
  - Creación de nuevas tareas mediante modal interactivo.
  - Edición del estado y descripción de tareas existentes.
  - Eliminación instantánea de elementos del estado.
- **Diseño UI/UX Dark Theme**: Paleta oscura con contrastes vibrantes, animación de carga y bordes decorativos con CSS puro.

---

## 🛠️ Tecnologías Utilizadas

- **Core**: [React 18](https://reactjs.org/) (JavaScript ES6+)
- **Enrutamiento**: [React Router DOM v6](https://reactrouter.com/)
- **Estilos**: CSS3 Puro (Variables CSS, CSS Grid, Flexbox, Keyframe Animations)
- **Tipografías**: Google Fonts (*Syne* y *DM Sans*)
- **Persistencia Temporal**: Web Storage API (`localStorage`)

---

## 📁 Estructura del Proyecto

```text
helptask-front/
├── src/
│   ├── assets/              # Recursos gráficos (imágenes, logos e íconos)
│   │   ├── dev.png
│   │   ├── Web.png
│   │   ├── kanban.png
│   │   ├── auth.png
│   │   ├── rapido.png
│   │   └── espacio.png
│   ├── components/          # Componentes globales y vistas de autenticación
│   │   ├── Footer.js        # Pie de página institucional
│   │   ├── Footer.css
│   │   ├── Login.js         # Vista de Inicio de Sesión
│   │   ├── Login.css        # Estilos compartidos de autenticación
│   │   ├── Register.js      # Vista de Registro de usuario
│   │   ├── Register.css
│   │   ├── Welcome.js       # Página principal / Landing page
│   │   └── Welcome.css
│   ├── pages/               # Vistas principales del sistema
│   │   └── Dashboard/
│   │       ├── Dashboard.js # Tablero principal de tareas (Kanban)
│   │       ├── Dashboard.css
│   │       ├── TaskCard.js  # Tarjeta individual de tarea
│   │       ├── TaskCard.css
│   │       ├── TaskModal.js # Modal para crear/editar tareas
│   │       └── TaskModal.css
│   ├── App.js               # Definición de rutas principales
│   ├── App.css              # Estilos globales y reseteo base
│   └── index.js             # Punto de entrada de la aplicación React
└── package.json             # Dependencias y scripts del proyecto
⚙️ Requisitos Previos e InstalaciónRequisitos:Node.js: v16.x o superiornpm: v8.x o superior (o yarn / pnpm)Pasos de Instalación:Clonar el repositorio o ingresar a la carpeta del frontend:Bashcd helptask-front
Instalar las dependencias requeridas:Bashnpm install
🚀 Ejecución en DesarrolloPara levantar el servidor de desarrollo local:Bashnpm start
La aplicación se abrirá automáticamente en http://localhost:3000.🧭 Rutas y NavegaciónRutaComponenteDescripciónProtección/WelcomePágina de bienvenida / Landing Page.Pública/loginLoginFormulario de acceso.Pública/registerRegisterFormulario de registro de usuario.Pública/dashboardDashboardTablero Kanban de gestión de tareas.Protegida (requiere usuario_nombre en localStorage)/footerFooterVista previa aislada del pie de página.Pública💻 Arquitectura de Componentes1. Welcome.js & Welcome.cssPágina de inicio con animación de entrada (show), gráficos responsivos y tira de características destacadas (Kanban Visual, Autenticación, Rapidez, Espacio propio).2. Login.js & Register.jsMódulos de autenticación que manejan validación de campos vacíos, formato de correo y longitud de contraseña. Guardan los datos en el localStorage para simular la persistencia con una API REST.3. Dashboard.jsCore de la aplicación. Coordina el estado de la lista de tareas tareas, filtrándolas según su propiedad estado:pendiente (Color rojo #FF5E7D)en-progreso (Color amarillo #FFB547)completado (Color verde #00D4AA)4. TaskCard.jsTarjeta atómica que muestra el título, descripción y los botones de acción (Editar, Eliminar) con un indicador visual lateral según el estado.5. TaskModal.jsModal superpuesto con soporte para agregar nuevas tareas o actualizar tareas preexistentes seleccionando pills de estado activas.🔒 Autenticación y Estado LocalActualmente el proyecto simula la autenticación mediante el localStorage del navegador:reg_nombre: Nombre del usuario registrado.reg_email: Correo electrónico del usuario registrado.reg_password: Contraseña registrada.usuario_nombre: Token/Clave de sesión activa.En el Dashboard.js, un hook useEffect verifica la presencia de usuario_nombre. Si la clave no está presente, redirige automáticamente a /login.🎨 Guía de Estilos y DiseñoEl sistema visual de HelpTask está basado en un tema oscuro (Dark Mode) configurado en variables CSS:CSS:root {
  --bg:       #0F1117; /* Fondo principal */
  --surface:  #1A1D27; /* Tarjetas y contenedores */
  --surface2: #22263A; /* Tarjetas de tareas */
  --border:   rgba(255,255,255,0.08);
  --accent:   #6C63FF; /* Color de acento (Violeta) */
  --accent2:  #FF6584; /* Acento secundario (Rosa) */
  --red:      #FF5E7D; /* Estado Pendiente */
  --yellow:   #FFB547; /* Estado En Progreso */
  --green:    #00D4AA; /* Estado Completado */
  --text:     #EEEEF5; /* Texto principal */
  --text-sub: #7B7FA8; /* Texto secundario */
}
🛠️ Próximos Pasos (Roadmap)[ ] Integración con Backend real (FastAPI / Node.js).[ ] Implementación de autenticación persistente con JSON Web Tokens (JWT).[ ] Drag and Drop nativo para mover tareas entre columnas Kanban.[ ] Filtros avanzados de búsqueda y etiquetas por prioridad.