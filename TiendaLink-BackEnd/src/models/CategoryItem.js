// src/models/CategoryItem.js
module.exports = (sequelize, DataTypes) => {
  const CategoryItem = sequelize.define('CategoryItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'category_items',
    timestamps: false
  });

  return CategoryItem;
};
