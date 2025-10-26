module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1  // Asumiendo que 1 es el ID de "Sin categoría"
    },
    // Nuevo campo para relacionar con la sección
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    discount: {
      type: DataTypes.STRING(50)
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    size: {
      type: DataTypes.STRING(10)
    },
    image: {
      type: DataTypes.STRING(255)
    }
  }, {
    tableName: 'products',
    timestamps: false
  });

  return Product;
};
