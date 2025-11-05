// src/models/index.js

const sequelize        = require('../db');
const { DataTypes }    = require('sequelize');

// Importar cada modelo
const Category        = require('./Category')(sequelize, DataTypes);
const Product         = require('./Product')(sequelize, DataTypes);
const Order           = require('./Order')(sequelize, DataTypes);
const OrderItem       = require('./OrderItem')(sequelize, DataTypes);
const User            = require('./User')(sequelize, DataTypes);
const SiteSetting     = require('./SiteSetting')(sequelize, DataTypes);
const Section         = require('./Section')(sequelize, DataTypes);
const CategoryItem    = require('./CategoryItem')(sequelize, DataTypes);
const Offer           = require('./Offer')(sequelize, DataTypes);
const Banner          = require('./Banner')(sequelize, DataTypes);
const Video           = require('./Video')(sequelize, DataTypes);

// Definir asociaciones

// 1. Category → Product
Category.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'products'
});
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'categoryData'
});

// 2. Category → CategoryItem
Category.hasMany(CategoryItem, {
  foreignKey: 'category_id',
  as: 'categoryItems'
});
CategoryItem.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});

// 3. Order → OrderItem
Order.hasMany(OrderItem, {
  foreignKey: 'order_id',
  as: 'items'
});
OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
  as: 'order'
});

// 4. Product → OrderItem
Product.hasMany(OrderItem, {
  foreignKey: 'product_id',
  as: 'orderItems'
});
OrderItem.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});

// 5. Section → Product
Section.hasMany(Product, {
  foreignKey: 'section_id',
  as: 'items'
});
Product.belongsTo(Section, {
  foreignKey: 'section_id',
  as: 'section'
});

// 6. Section → Offer
Section.hasMany(Offer, {
  foreignKey: 'section_id',
  as: 'offers'
});
Offer.belongsTo(Section, {
  foreignKey: 'section_id',
  as: 'section'
});

// 7. Section → Banner
Section.hasMany(Banner, {
  foreignKey: 'section_id',
  as: 'banners'
});
Banner.belongsTo(Section, {
  foreignKey: 'section_id',
  as: 'section'
});

// 8. Section → Video
Section.hasMany(Video, {
  foreignKey: 'section_id',
  as: 'videos'
});
Video.belongsTo(Section, {
  foreignKey: 'section_id',
  as: 'section'
});

// Exportar todo
module.exports = {
  sequelize,
  Category,
  Product,
  Order,
  OrderItem,
  User,
  SiteSetting,
  Section,
  CategoryItem,
  Offer,
  Banner,
  Video
};
