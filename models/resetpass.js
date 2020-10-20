module.exports = (sequelize, DataTypes) => {
    const ResetPass = sequelize.define("ResetPass", {
    
      UserFK: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      code: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });
    return ResetPass;
  };