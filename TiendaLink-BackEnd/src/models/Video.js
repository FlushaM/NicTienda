module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
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
    videoUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'video_url'
    },
    thumbnailUrl: {
      type: DataTypes.TEXT,
      field: 'thumbnail_url'
    },
    position: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'videos',
    timestamps: false
  });

  return Video;
};
