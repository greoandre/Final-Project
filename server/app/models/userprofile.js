'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User)
      UserProfile.belongsTo(models.Level)
    }
  }
  UserProfile.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {msg: "User Id Required"}
      }
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Phone Number Required"}
      }
    },
    subscription: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Subscription Required"}
      }
    },
    gender: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Gender Required"}
      }
    },
    dateBirth: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Date Birth Required"}
      }
    },
    LevelId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {msg: "Level Id Required"}
      }
    },
    goals: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Goals Required"}
      }
    },
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};