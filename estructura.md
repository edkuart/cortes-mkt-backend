## 📁 Estructura del Proyecto

```
backend/
├── server.js                         # 🚀 Servidor principal Express
├── database.sqlite                   # 🗂 Base de datos SQLite
├── package.json                      # 📦 Configuración del proyecto
├── .env                              # 🔐 Variables de entorno
│
├── config/
│   └── db.js                         # ⚙️ Configuración de Sequelize
│
├── controllers/
│   ├── aiController.js              # 🤖 Lógica para IA
│   ├── authController.js            # 🔐 Login y registro tradicional
│   ├── authGoogleController.js      # 🔐 Login con Google OAuth
│   ├── devolucionesController.js    # 📦 Controlador de devoluciones
│   ├── entregasController.js        # 🚚 Controlador de entregas
│   ├── historialController.js       # 📜 Obtener historial de cambios de producto
│   ├── mensajesController.js        # 💬 Mensajes entre usuarios
│   ├── notificacionesController.js  # 🔔 Lógica para enviar notificaciones (ej: por email)
│   ├── pedidosController.js         # 📥 Controlador de pedidos
│   ├── productosController.js       # 🛍 Controlador principal de productos
│   ├── resenasController.js         # ✍️ Controlador de reseñas
│   ├── usuariosController.js        # 👤 Perfil, cambio de datos y contraseña
│   └── vendedoresController.js      # 🧑‍💼 Controlador del panel vendedor
│
├── middleware/
│   ├── authMiddleware.js            # 🔐 Protege rutas según rol
│   ├── uploadMiddleware.js          # 📤 Multer para imágenes
│   └── verificarToken.js            # ✅ Verifica JWT y pasa `req.usuario`
│
├── models/
│   ├── index.js                     # 🔗 Inicializa Sequelize y relaciones
│   ├── detallePedido.model.js       # 📦 Detalles de productos por pedido
│   ├── devolucion.js                # 🔁 Modelo de devoluciones
│   ├── entrega.model.js             # 🚚 Modelo de entregas
│   ├── historialProducto.js         # 📝 Modelo para registrar cambios de productos
│   ├── interaccionIA.model.js       # 🧠 Interacciones con la IA
│   ├── mensaje.model.js             # 💬 Mensajes entre usuarios
│   ├── pedido.model.js              # 🛒 Pedidos
│   ├── producto.model.js            # 🛍 Productos en venta
│   ├── rankingVendedor.model.js     # 🏅 Métricas de vendedor
│   ├── resena.model.js              # ✍️ Opiniones de productos
│   ├── usuario.model.js             # 👤 Usuarios base
│   └── vendedor.model.js            # 🧑‍💼 Datos adicionales para vendedores
│
├── routes/
│   ├── ai.routes.js                 # 🔀 Ruta para IA
│   ├── authRoutes.js                # 🔀 Login y registro
│   ├── pedidosRoutes.js             # 🔀 Rutas de pedidos
│   ├── productosRoutes.js           # 🔀 Rutas de productos
│   ├── resenasRoutes.js             # 🔀 Rutas de reseñas
│   ├── devolucionesRoutes.js        # 🔀 Devoluciones
│   ├── notificacionesRoutes.js      # 🔀 Notificaciones (email, etc)
│   └── mensajesRoutes.js            # 🔀 Chat y conversaciones
│
├── services/
│   ├── aiService.js                 # 🤖 Integración de IA
│   └── openaiClient.js              # 🔑 Configuración OpenAI
│
├── migrations/                      # 🧬 (opcional) Migraciones futuras si decides usar CLI
├── node_modules/
└── tests/                           # 🧪 (opcional) Tests unitarios o integrados

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