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

    Result.associate = (models) => {
        Result.hasMany(models.User, {
          foreignKey: {
            name: 'id',
          },
        });

        Result.hasOne(models.Quiz, {
            foreignKey: {
              name: 'id',
            },
          });
    };
    return Result;
  };