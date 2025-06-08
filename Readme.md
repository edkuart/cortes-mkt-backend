# 📦 Backend - Marketplace Modular

Este proyecto representa el backend de un marketplace modular creado con **Node.js**, **Express**, y **Sequelize (SQLite)**. Incluye funcionalidades para manejar productos, usuarios, pedidos, autenticación, reseñas, devoluciones, notificaciones por correo electrónico e integración con IA.

---

## 📚 Contenido

- [Arquitectura](#️-arquitectura)
- [Dependencias Clave](#-dependencias-clave)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#️-estructura-del-proyecto)
- [Configuración Inicial](#-configuración-inicial)
- [Entornos](#-entornos)
- [Documentación Swagger](#-documentación-swagger)
- [Rutas y Endpoints Principales](#-rutas-y-endpoints-principales)
- [Funcionalidades Nuevas](#-funcionalidades-nuevas)
- [Guía Rápida de Pruebas](#-guía-rápida-de-pruebas)
- [Contacto](#-contacto)

## 🏛️ Arquitectura

El siguiente diagrama muestra el flujo general de la arquitectura de la aplicación:

```mermaid
graph TD
    A[Frontend] <--> B[API Gateway: Express.js];
    B --> C{Sequelize ORM};
    C --> D[(SQLite / PostgreSQL)];
    B --> E[Servicio de IA: OpenAI];
    B --> F[Servicio de Correo: Nodemailer];

    subgraph "Backend"
        B
        C
        E
        F
    end

(Diagrama de arquitectura simple que muestra la interconexión de los servicios principales.)

📦 Dependencias Clave

Librería	Uso
express	Framework principal del backend para gestionar rutas y middleware.
sequelize	ORM para interactuar con la base de datos (SQLite en desarrollo).
jsonwebtoken	Generación y verificación de tokens para la autenticación de usuarios.
openai	Integración con la API de OpenAI para funcionalidades de IA.
nodemailer	Envío de notificaciones automáticas por correo electrónico.
multer	Middleware para gestionar la subida de archivos, como imágenes de perfil.
bcryptjs	Hashing seguro de contraseñas de usuario.
swagger-ui-express	Generación de documentación interactiva para la API.

🚀 Tecnologías Utilizadas

    Node.js & Express.js
    Sequelize ORM con SQLite
    OpenAI API
    Nodemailer
    JSON Web Tokens (JWT)
    Google OAuth 2.0
    bcryptjs
    Cors
    dotenv
    nodemon
    day.js

🏗️ Estructura del Proyecto

---

cortes-mkt-backend/
├── .env                  # 🔐 Variables de entorno
├── .gitignore
├── package.json          # 📦 Configuración del proyecto
├── package-lock.json
├── server.js             # 🚀 Servidor principal Express
├── swagger.js            # 🩺 Configuración raíz de Swagger
├── Readme.md
├── estructura.md         # 👈 Tu archivo de estructura
│
├── database/
│   ├── database.sqlite   # 🗂 Base de datos SQLite
│   ├── config.json       # ⚙️ Credenciales de BD para Sequelize (antes en /config)
│   └── migrations/       # 🚚 Migraciones de la base de datos
│       └── 20250511005443-create-devolucion.js
│
└── src/
    ├── config/
    │   └── db.js         # ⚙️ Configuración de la conexión Sequelize
    │
    ├── controllers/
    │   ├── adminController.js
    │   ├── aiController.js
    │   ├── authController.js
    │   ├── authGoogleController.js
    │   ├── devolucionesController.js
    │   ├── entregasController.js
    │   ├── favoritosController.js
    │   ├── historialController.js
    │   ├── mensajesController.js
    │   ├── notificacionesController.js
    │   ├── pedidosController.js
    │   ├── productosController.js
    │   ├── resenasController.js
    │   ├── usuariosController.js
    │   └── vendedoresController.js
    │
    ├── middleware/
    │   ├── authMiddleware.js
    │   ├── uploadMiddleware.js
    │   └── verificarToken.js
    │
    ├── models/
    │   ├── index.js
    │   ├── detallePedido.model.js
    │   ├── devolucion.model.js         # <-- Renombrado para consistencia
    │   ├── entrega.model.js
    │   ├── favorito.model.js           # <-- Nuevo
    │   ├── historialProducto.model.js  # <-- Renombrado para consistencia
    │   ├── interaccionIA.model.js
    │   ├── mensaje.model.js
    │   ├── pedido.model.js
    │   ├── producto.model.js
    │   ├── rankingVendedor.model.js
    │   ├── reporte.model.js            # <-- Nuevo y renombrado
    │   ├── resena.model.js
    │   ├── usuario.model.js
    │   └── vendedor.model.js
    │
    ├── routes/
    │   ├── adminRoutes.js
    │   ├── ai.routes.js
    │   ├── authRoutes.js
    │   ├── debugRoutes.js
    │   ├── devolucionesRoutes.js
    │   ├── entregasRoutes.js
    │   ├── favoritosRoutes.js
    │   ├── historialRoutes.js
    │   ├── mensajesRoutes.js
    │   ├── notificacionesRoutes.js
    │   ├── pedidosRoutes.js
    │   ├── productosRoutes.js
    │   ├── resenasRoutes.js
    │   ├── usuariosRoutes.js
    │   ├── vendedoresRoutes.js
    │   └── swagger/                    # 📘 Documentación Swagger por módulo
    │       ├── index.js                # Unifica todos los docs
    │       ├── auth.docs.js
    │       ├── devoluciones.docs.js
    │       ├── entregas.docs.js
    │       ├── favoritos.docs.js
    │       ├── historial.docs.js
    │       ├── ia.docs.js
    │       ├── mensajes.docs.js
    │       ├── notificaciones.docs.js
    │       ├── pedidos.docs.js
    │       ├── productos.docs.js
    │       ├── resenas.docs.js
    │       ├── usuarios.docs.js
    │       └── vendedores.docs.js
    │
    ├── services/
    │   ├── aiService.js
    │   ├── emailService.js
    │   ├── openaiClient.js
    │   ├── productoService.js          # <-- Nuevo
    │   └── UserService.js
    │
    └── utils/
        ├── actualizarRanking.js
        └── palabrasProhibidas.ts
│
└── tests/
    ├── resenas.test.http
    └── test-email.js

---

🔧 Configuración Inicial

    Instalar dependencias:
    Bash

npm install

Configurar .env:
Crea un archivo .env en la raíz del proyecto y añade las siguientes variables:
Fragmento de código

    PORT=4000
    JWT_SECRET=clave_secreta_muy_segura
    OPENAI_API_KEY=sk-xxxx
    USE_OPENAI=true
    EMAIL_HOST=smtp.gmail.com
    EMAIL_PORT=587
    EMAIL_USER=tu_correo@gmail.com
    EMAIL_PASS=tu_contraseña_de_aplicacion_de_google
    ADMIN_EMAIL=correo_admin@gmail.com
    EMAIL_FROM="Marketplace <tu_correo@gmail.com>"
    GOOGLE_CLIENT_ID=tu_google_client_id.apps.googleusercontent.com

🧪 Entornos

Desarrollo

Para iniciar el servidor en modo de desarrollo con recarga automática:
Bash

npm run dev

    El servidor se ejecutará en http://localhost:4000.
    Utiliza la base de datos local de SQLite (database/database.sqlite).
    Los cambios en el código reinician el servidor automáticamente gracias a nodemon.

Producción

    Se recomienda servir la aplicación con un gestor de procesos como PM2 o contenerizarla con Docker.
    La configuración de la base de datos (PostgreSQL, MySQL, etc.) se debe ajustar en database/config.json y las credenciales deben ser gestionadas a través de variables de entorno en el servidor de producción.

📘 Documentación Swagger

Una vez que el servidor esté en funcionamiento, puedes acceder a la documentación interactiva de la API generada por Swagger.

URL: http://localhost:4000/api-docs

Esta documentación te permite visualizar y probar todos los endpoints disponibles de forma sencilla. Incluye secciones para:

    Autenticación (Login, Registro, Google Auth)
    Gestión de Usuarios y Vendedores
    CRUD de Productos y Pedidos
    Sistema de Reseñas y Devoluciones
    Notificaciones y Mensajería interna

🔗 Rutas y Endpoints Principales

✅ Autenticación

    POST /api/auth/login
    POST /api/auth/registro
    POST /api/auth/login-google

👤 Usuarios

    GET /api/usuarios
    POST /api/usuarios
    PATCH /api/usuarios/:id

📦 Productos

    GET /api/productos
    POST /api/productos
    DELETE /api/productos/:id

🛒 Pedidos

    GET /api/pedidos
    GET /api/pedidos/usuario/:id
    POST /api/pedidos

💬 Reseñas

    POST /api/resenas
    PATCH /api/resenas/:id
    GET /api/resenas/producto/:id

🔥 Funcionalidades Nuevas

    ✏️ Editar reseñas (dentro de 24h)
    🗑️ Eliminar reseñas (si no tienen respuesta)
    💬 Responder reseñas por parte del vendedor
    🧹 Moderación de respuestas (antispam e insultos)
    📩 Notificación automática al recibir reseñas
    📊 Ranking e historial de calificaciones
    ✅ Control por rol (comprador vs. vendedor)
    🔐 Login con Google integrado (OAuth 2.0)
    🆕 Campo fotoPerfil y fotoUrl en respuesta de usuario.
    🆕 Middleware verificarToken para proteger rutas.
    🆕 Ruta pública para imágenes uploads/perfiles servida desde Express.

📜 Guía Rápida de Pruebas

A continuación, se muestran ejemplos de cómo interactuar con la API usando cURL.
1. Crear reseña

Primero, obtén un token JWT iniciando sesión. Luego, úsalo como Bearer Token.
Bash

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." # Reemplazar con tu token

curl -X POST http://localhost:4000/api/resenas \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "vendedorId": 1,
    "productoId": 1,
    "pedidoId": 1,
    "comentario": "¡Excelente producto, lo recomiendo!",
    "calificacion": 5
  }'

2. Enviar mensaje a un vendedor
Bash

curl -X POST http://localhost:4000/api/mensajes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "receptorId": 1, # ID del vendedor
    "contenido": "¿Hola! ¿Tienes más productos disponibles?"
  }'

3. Actualizar foto de perfil
Bash

curl -X PATCH http://localhost:4000/api/usuarios/ID_DEL_USUARIO \
  -H "Authorization: Bearer $TOKEN" \
  -F "nombreCompleto=Nuevo Nombre Actualizado" \
  -F "fotoPerfil=@/ruta/completa/a/tu/imagen.jpg"

📬 Contacto

Para dudas, sugerencias o soporte, puedes contactarme en edkuart@gmail.com.

✨ Este proyecto fue creado con fines educativos y como una base sólida para futuras integraciones, como aplicaciones móviles, notificaciones push y módulos avanzados de marketing.