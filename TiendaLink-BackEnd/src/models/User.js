module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(100)
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true
      },
      password: {
        type: DataTypes.STRING(255)
      },
      role: {
        type: DataTypes.STRING(50),
        defaultValue: 'admin'
      }
    }, {
      tableName: 'users',
      timestamps: false
    });
  
    return User;
  };
  