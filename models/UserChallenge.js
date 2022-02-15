const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserChallenge extends Model {}

UserChallenge.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    challenge_id: {
      type: DataTypes.INTEGER,
      // References the Product model's id
      references: {
        model: 'challenge',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      // References the Tag model's id
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_challenge',
  }
);
module.exports = UserChallenge;