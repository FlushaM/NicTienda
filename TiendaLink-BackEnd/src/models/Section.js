// src/models/Section.js
module.exports = (sequelize, DataTypes) => {
    const Section = sequelize.define('Section', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(100)
      },
      type: {
        type: DataTypes.STRING(50) // 'category', 'products', etc.
      },
      layout: {
        type: DataTypes.STRING(50) // 'grid', 'carousel', 'featured', etc.
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      position: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    }, {
      tableName: 'sections',
      timestamps: false
    });
  
    return Section;
  };
  