const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OptionSet extends Model {}

OptionSet.init(
  {
    option1: DataTypes.STRING,
    option2: DataTypes.STRING,
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
