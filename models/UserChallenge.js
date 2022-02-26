const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserChallenge extends Model {}

UserChallenge.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    challenge_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'challenge',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
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