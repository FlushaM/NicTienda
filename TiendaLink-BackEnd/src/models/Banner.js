module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define('Banner', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'section_id'
    },
    title: {
      type: DataTypes.STRING(200)
    },
    subtitle: {
      type: DataTypes.STRING(200)
    },
    buttonText: {
      type: DataTypes.STRING(100),
      field: 'button_text'
    },
    buttonLink: {
      type: DataTypes.STRING(255),
      field: 'button_link'
    },
    image: {
      type: DataTypes.TEXT
    },
    position: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'banners',
    timestamps: false
  });

  return Banner;
};
