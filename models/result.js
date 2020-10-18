module.exports = (sequelize, DataTypes) => {
    const Result = sequelize.define("Result", {

    UserFK: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    QuizFK: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TotalMark: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
          
    });
    return Result;
  };