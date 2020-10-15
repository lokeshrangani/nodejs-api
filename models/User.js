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
    is_online: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    remember_token: {
      type: DataTypes.TEXT,
      allowNull: true
    }

  });
  
  // User.sync({force: true}).then(function () {
    // Table created
  //   return User.create({
  //     name: 'John'
  //   });
  // });
  return User;
};