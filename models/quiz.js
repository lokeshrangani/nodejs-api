module.exports = (sequelize, DataTypes) => {
    const Quiz = sequelize.define("Quiz", {

    QuizTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    QuizStatus: {
        type: DataTypes.STRING,
        allowNull: true
    },
    QuizCode: {
      type: DataTypes.TEXT,
      allowNull: true
  },
    UserFK: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
          
    });

    Quiz.associate = (models) => {
        Quiz.hasMany(models.Quesion, {
          foreignKey: {
            name: 'QuizFK',
            // type: DataTypes.INTEGER,
            // allowNull: false
          },
          // as: 'questions'
        });
    };
    return Quiz;
  };