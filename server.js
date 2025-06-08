// 📁 backend/server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');
const { setupSwagger } = require('./swagger');

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Swagger
setupSwagger(app);

// Rutas principales
app.use('/api/favoritos', require('./routes/favoritosRoutes'));
app.use('/api/devoluciones', require('./routes/devolucionesRoutes'));
app.use('/api/usuarios', require('./routes/usuariosRoutes'));
app.use('/api/pedidos', require('./routes/pedidosRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/productos', require('./routes/productosRoutes'));
app.use('/api/ia', require('./routes/ai.routes'));
app.use('/api/resenas', require('./routes/resenasRoutes'));
app.use('/api/entregas', require('./routes/entregasRoutes'));
app.use('/api/vendedores', require('./routes/vendedoresRoutes'));
app.use('/api/mensajes', require('./routes/mensajesRoutes'));
app.use('/api/historial', require('./routes/historialRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/notificaciones', require('./routes/notificacionesRoutes'));

// Rutas debug protegidas
if (process.env.NODE_ENV === 'development') {
  app.use('/debug', require('./routes/debugRoutes'));

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

  app.get('/debug/crear-usuario', async (req, res) => {
    const { Usuario, Vendedor } = require('./models');
    const bcrypt = require('bcryptjs');

    try {
      const existente = await Usuario.findOne({ where: { correo: 'test@correo.com' } });
      if (existente) return res.status(200).json({ mensaje: '⚠️ Usuario ya existe', usuario: existente });

      const hash = await bcrypt.hash('123456', 10);
      const nuevoUsuario = await Usuario.create({
        nombreCompleto: 'Preda Welch',
        correo: 'test@correo.com',
        contraseña: hash,
        rol: 'vendedor'
      });

      const nuevoVendedor = await Vendedor.create({
        usuarioId: nuevoUsuario.id,
        telefono: '12345678',
        direccion: 'Zona 1, Xela',
        municipio: 'Quetzaltenango',
        departamento: 'Quetzaltenango',
        estado: 'pendiente'
      });

      res.status(201).json({ mensaje: '✅ Usuario y vendedor creados', usuario: nuevoUsuario, vendedor: nuevoVendedor });
    } catch (error) {
      console.error('❌ Error al crear usuario y vendedor:', error);
      res.status(500).json({ mensaje: 'Error al crear usuario y vendedor', error });
    }
  });

  app.get('/debug/crear-comprador', async (req, res) => {
    const { Usuario } = require('./models');
    const bcrypt = require('bcryptjs');

    try {
      const existente = await Usuario.findOne({ where: { correo: 'comprador@correo.com' } });
      if (existente) return res.status(200).json({ mensaje: '⚠️ Comprador ya existe', usuario: existente });

      const hash = await bcrypt.hash('123456', 10);
      const nuevoUsuario = await Usuario.create({
        nombreCompleto: 'Comprador Test',
        correo: 'comprador@correo.com',
        contraseña: hash,
        rol: 'comprador'
      });

      res.status(201).json({ mensaje: '✅ Comprador creado', usuario: nuevoUsuario });
    } catch (error) {
      console.error('❌ Error al crear comprador:', error);
      res.status(500).json({ mensaje: 'Error al crear comprador' });
    }
  });
}

// Ruta base
app.get('/', (req, res) => {
  res.send('🚀 Bienvenido al Marketplace Modular Backend');
});

// Inicialización
const PORT = process.env.PORT || 4000;
const resetDB = process.env.RESET_DB === 'true';

sequelize.sync({ force: resetDB })
  .then(async () => {
    console.log('🟢 Base de datos sincronizada correctamente');

    const estructura = await sequelize.getQueryInterface().describeTable('productos');
    console.log('📊 Estructura de la tabla productos:');
    console.table(estructura);

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📘 Swagger disponible en http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error('🔴 Error al sincronizar la base de datos:', error);
  });