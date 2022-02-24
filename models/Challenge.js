const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const moment = require('moment');

class Challenge extends Model {}

Challenge.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    starting_date: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('starting_date')).format('MMMM Do YYYY');
    },
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    ending_date: {
      type: DataTypes.DATEONLY,
      get() {
        return moment(this.getDataValue('ending_date')).endOf('day').fromNow(true);
    },
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "challenge",
  }
);
module.exports = Challenge;
