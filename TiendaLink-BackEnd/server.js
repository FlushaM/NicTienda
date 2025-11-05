// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models');

// Importar rutas
const authRoutes = require('./src/routes/auth');
const settingsRoutes = require('./src/routes/settings');
const uploadRoutes = require('./src/routes/upload');
const homeRoutes = require('./src/routes/home');
const sectionsRoutes = require('./src/routes/sections');
const productsRoutes = require('./src/routes/products');
const categoriesRoutes = require('./src/routes/categories');
const categoryItemsRoutes = require('./src/routes/categoryItems');
const ordersRoutes = require('./src/routes/orders'); // ✔️ Ruta de pedidos
const offersRoutes     = require('./src/routes/offers');
const bannersRoutes = require('./src/routes/banners');
const videosRoutes = require('./src/routes/videos');

const app = express();

// Configuración de CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());

// Middleware para parsear JSON
app.use(express.json());

// Conectar y sincronizar DB
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa.');
    await sequelize.sync();
    console.log('✅ Modelos sincronizados correctamente.');
  } catch (error) {
    console.error('❌ Error en la conexión o sincronización:', error);
    process.exit(1);
  }
})();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/sections', sectionsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/category-items', categoryItemsRoutes);
app.use('/api/orders', ordersRoutes); // ✔️ Montado una sola vez
app.use('/api/offers',       offersRoutes);
app.use('/api/banners', bannersRoutes);
app.use('/api/videos', videosRoutes);

// Rutas de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend funcionando correctamente' });
});

app.get('/', (req, res) => {
  res.send('tienda link funcionando');
});

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
