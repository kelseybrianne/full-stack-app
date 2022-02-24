const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const moment = require('moment');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING(1234),
      allowNull: true,
    },
    date_created: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('date_created')).startOf('hour').fromNow();;
    },
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    challenge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);
module.exports = Post;
