const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OptionSet extends Model {}

OptionSet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    option1: DataTypes.STRING,
    option1_image: DataTypes.STRING, //Option 1 image URL
    option2: DataTypes.STRING,
    option2_image: DataTypes.STRING, //Option 2 image URL
    perfect_day_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'perfect_day',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'option_set'
  }
);

module.exports = OptionSet;
