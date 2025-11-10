module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'section_id'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'video_url'
    },
    position: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'videos',
    timestamps: false
  });

  Video.associate = (models) => {
    Video.belongsTo(models.Section, { 
      foreignKey: 'section_id',
      as: 'section'
    });
  };

  return Video;
};
