module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // is_online: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    // remember_token: {
    //   type: DataTypes.TEXT,
    //   allowNull: true
    // }
  });

  User.associate = (models) => {
    User.hasMany(models.Quiz, {
      foreignKey: {
        name: 'UserFK',
        type: DataTypes.INTEGER,
        allowNull: false
      },
      as: 'quizzes'
    });
  };
  return User;
};