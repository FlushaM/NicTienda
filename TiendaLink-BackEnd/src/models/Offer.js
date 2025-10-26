// src/models/Offer.js

module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define(
    'Offer',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      section_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'sections',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
         size: {
             type: DataTypes.ENUM('small','medium','large','xl'),
             defaultValue: 'medium'
           },
           section_id: {              // si no lo tenías explícito
             type: DataTypes.INTEGER,
            allowNull: false
           },
    },
    {
      tableName: 'offers',
      timestamps: true
      // no underscored: true, so fields match DB camelCase
    }
  );

  return Offer;
};
