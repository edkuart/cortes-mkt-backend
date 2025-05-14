// backend/server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Luego ya tus rutas:
const devolucionesRoutes = require('./routes/devolucionesRoutes');
app.use('/api/devoluciones', devolucionesRoutes);

app.get('/debug/crear-pedido', async (req, res) => {
  const { Pedido } = require('./models');

  const nuevo = await Pedido.create({
    compradorId: 1,
    total: 100,
    estado: 'pendiente',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.json(nuevo);
});

// ✅ Ruta corregida: ahora está fuera de la anterior
app.get('/debug/crear-usuario', async (req, res) => {
  const { Usuario, Vendedor } = require('./models');
  const bcrypt = require('bcryptjs');

  try {
    // Buscar si ya existe por correo
    const existente = await Usuario.findOne({ where: { correo: 'test@correo.com' } });

    if (existente) {
      return res.status(200).json({ mensaje: '⚠️ Usuario ya existe', usuario: existente });
    }

    const hash = await bcrypt.hash('123456', 10);

    const nuevoUsuario = await Usuario.create({
      nombreCompleto: 'Preda Welch',
      correo: 'test@correo.com',
      contraseña: hash,
      rol: 'vendedor'
    });

    const nuevoVendedor = await Vendedor.create({
      usuarioId: nuevoUsuario.id
    });

    res.status(201).json({ mensaje: '✅ Usuario y vendedor creados', usuario: nuevoUsuario, vendedor: nuevoVendedor });

  } catch (error) {
    console.error('❌ Error al crear usuario y vendedor:', error);
    res.status(500).json({ mensaje: 'Error al crear usuario y vendedor' });
  }
});

// Importar rutas
const usuariosRoutes = require('./routes/usuariosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const authRoutes = require('./routes/authRoutes');
const productosRoutes = require('./routes/productosRoutes');
const aiRoutes = require('./routes/ai.routes');
const entregasRoutes = require('./routes/entregasRoutes');
const resenasRoutes = require('./routes/resenasRoutes');

// Usar rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ia', aiRoutes);
app.use('/api/resenas', resenasRoutes);
app.use('/api/entregas', entregasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🚀 Bienvenido al Marketplace Modular Backend');
});

app.get('/debug/pedidos', async (req, res) => {
  const { Pedido } = require('./models');
  const pedidos = await Pedido.findAll();
  res.json(pedidos);
});

const notificacionesRoutes = require('./routes/notificacionesRoutes');
app.use('/api/notificaciones', notificacionesRoutes);

// Puerto y sincronización de base de datos
const PORT = process.env.PORT || 4000;
const { sequelize } = require('./models');

sequelize.sync({ alter: true })
  .then(() => {
    console.log("🟢 Base de datos sincronizada correctamente");
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);

      try {
        const rutas = app._router?.stack
          .filter(r => r.route)
          .map(r =>
            `➡ Ruta registrada: ${Object.keys(r.route.methods).join(', ').toUpperCase()} ${r.route.path}`
          );

        rutas?.forEach(r => console.log(r));
      } catch (e) {
        console.warn("⚠ No se pudo mostrar las rutas registradas:", e.message);
      }
    });
  })
  .catch((error) => {
    console.error("🔴 Error al sincronizar la base de datos:", error);
  });

