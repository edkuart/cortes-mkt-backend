# 📦 Backend - Marketplace Modular

Este proyecto representa el backend de un marketplace modular creado con **Node.js**, **Express**, y **Sequelize (SQLite)**. Ahora incluye funcionalidades para manejar productos, usuarios, pedidos, autenticación, reseñas, devoluciones y notificación por correo electrónico.

---

## 🚀 Tecnologías Utilizadas

- Node.js
- Express.js
- Sequelize ORM
- SQLite (base de datos)
- OpenAI (API)
- Nodemailer (notificaciones por correo)
- dotenv
- nodemon (desarrollo)
- day.js (fechas)
- bcryptjs
- Cors + JWT
- Google Auth Library (OAuth2.0)

---

## 📁 Estructura del Proyecto

```
backend/
├── server.js
├── database.sqlite
├── package.json
├── .env
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── pedidosController.js
│   ├── productosController.js
│   ├── resenasController.js
│   ├── devolucionesController.js
│   └── notificacionesController.js
├── models/
│   ├── index.js
│   ├── detallePedido.model.js
│   ├── interaccionIA.model.js
│   ├── pedido.model.js
│   ├── producto.model.js
│   ├── resena.model.js
│   ├── usuario.model.js
│   ├── devolucion.model.js
│   └── vendedor.model.js
├── routes/
│   ├── ai.routes.js
│   ├── authRoutes.js
│   ├── pedidosRoutes.js
│   ├── productosRoutes.js
│   ├── resenasRoutes.js
│   ├── devolucionesRoutes.js
│   └── notificacionesRoutes.js
├── services/
│   ├── aiService.js
│   └── openaiClient.js

```

frontend/
├── components/
│   ├── Form/
│   │   ├── InputArchivo.tsx          # 📤 Input especializado para archivos (vendedor)
│   │   ├── InputText.tsx             # 🧾 Reutilizable para inputs de texto/email/password
│   │   └── SelectRol.tsx             # 👤 Selector de rol (comprador/vendedor)
│   ├── Estrellas.tsx                 # ⭐ Visualizador de calificación
│   ├── IAResponseBox.tsx             # 🤖 Respuestas generadas por IA
│   ├── Layout.tsx                    # 🧱 Layout general (si aplica)
│   ├── PedidoCard.tsx                # 🧾 Vista individual de un pedido
│   ├── PedidoForm.tsx                # 📥 Formulario de solicitud
│   ├── ProductoCard.tsx              # 🛍 Vista individual de producto
│   ├── ProductoForm.tsx              # 🧾 Formulario para crear producto
│   ├── ReseñasBox.tsx                # ✍️ Caja para ver y dejar reseñas
│   └── SolicitarDevolucion.tsx       # 📦 Solicitud de devolución
│
├── hooks/
│   ├── useAuth.ts                    # 🔐 Autenticación con token localStorage
│   ├── useIA.ts                      # ⚙️ Llamadas a la IA
│   └── useResenasProducto.ts         # 🔁 Hook para reseñas públicas de producto
│
├── pages/
│   ├── api/
│   │   └── hello.ts
│   ├── comprador/
│   │   ├── carrito.tsx
│   │   ├── crear-resena.tsx
│   │   ├── editar-resena.tsx
│   │   ├── mis-pedidos.tsx
│   │   └── mis-resenas.tsx
│   ├── resenas-producto/
│   │   ├── [id].tsx
│   │   └── resumen.tsx
│   ├── vendedor/
│   │   ├── dashboard-vendedor.tsx
│   │   ├── panel-vendedor.tsx
│   │   ├── Pedidos-Vendedor.tsx
│   │   ├── responder-resenas.tsx
│   │   └── resumen-resenas.tsx
│   ├── _app.tsx                      # 🌐 Configura GoogleOAuthProvider
│   ├── _document.tsx
│   ├── ia.tsx
│   ├── index.tsx
│   ├── login.tsx                     # 🔐 Incluye login tradicional y con Google
│   └── registro.tsx                  # ✅ Registro tradicional y con Google
│
├── public/
│   └── (imágenes, íconos, etc.)
│
├── services/
│   └── apiService.ts
│
├── styles/
│   └── globals.css
│
├── utils/
│   └── estrellas.ts
│
├── .env.local                        # ⚙️ Incluye NEXT_PUBLIC_GOOGLE_CLIENT_ID
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

---

🔧 Configuración Inicial

    Instalar dependencias:

npm install

    Configurar .env:

PORT=4000
JWT_SECRET=clave_secreta
OPENAI_API_KEY=sk-xxxx
USE_OPENAI=true
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_app
ADMIN_EMAIL=correo_admin@gmail.com
EMAIL_FROM=Marketplace <tu_correo@gmail.com>
GOOGLE_CLIENT_ID=tu_google_client_id

    Iniciar servidor:

npm run dev

🔗 Rutas y Endpoints Principales
✅ Autenticación

    POST /api/auth/login

    POST /api/auth/registro

    POST /api/auth/login-google

👤 Usuarios

    GET /api/usuarios

    POST /api/usuarios

📦 Productos

    GET /api/productos

    POST /api/productos

    DELETE /api/productos/:id

🛒 Pedidos

    GET /api/pedidos

    GET /api/pedidos/usuario/:id

    POST /api/pedidos

💬 Reseñas

    GET /api/resenas/vendedor/:id

    GET /api/resenas/comprador/:id

    GET /api/resenas/producto/:id

    POST /api/resenas ← Crea reseña

    PATCH /api/resenas/:id ← Edita dentro de 24h

    DELETE /api/resenas/:id ← Solo si no ha sido respondida

    GET /api/resenas/verificar/:compradorId/:pedidoId ← Verifica si ya reseñó

🗨 Respuestas del Vendedor

    Campo respuestaVendedor en reseñas

    Rutas incluidas en PATCH /api/resenas/:id

    Restricción: solo una vez

📧 Notificaciones

    POST /api/notificaciones/correo

    Se envía correo automático al vendedor con cada nueva reseña

    Si la calificación es menor a 3, se marca como urgente

🛠 Consideraciones

    Base de datos se sincroniza automáticamente.

    Se puede forzar reseteo con:
```js
sequelize.sync({ force: true })
```

    La lógica de notificación por correo está desacoplada y puede reutilizarse en otras acciones (como devoluciones).

---

🔥 Funcionalidades Nuevas

- ✏️ **Editar reseñas** (dentro de 24h)
- 🗑️ **Eliminar reseñas** (si no tienen respuesta)
- 💬 **Responder reseñas por parte del vendedor**
- 🧹 **Moderación de respuestas (antispam e insultos)**
- 📩 **Notificación automática al recibir reseñas**
- 📊 **Ranking e historial de calificaciones**
- ✅ **Control por rol (comprador vs. vendedor)**
- 🔐 **Login con Google integrado (OAuth 2.0)**

---

📬 Contacto

Para dudas o soporte: [edkuart@gmail.com](mailto:edkuart@gmail.com)

✨ Proyecto creado con fines educativos, con posibilidad de integrarse en aplicaciones móviles y futuras mejoras como notificaciones avanzadas y funciones de marketing.

