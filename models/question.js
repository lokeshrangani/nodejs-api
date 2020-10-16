module.exports = (sequelize, DataTypes) => {
    const Quesion = sequelize.define("Quesion", {
    
    QuizFK: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Quesion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
      option1: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      option2: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      option3: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      option4: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    });
    return Quesion;
  };