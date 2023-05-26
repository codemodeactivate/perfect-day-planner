const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PerfectDay extends Model {}

PerfectDay.init(
  {
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
    modelName: 'perfect_day'
  }
);

module.exports = PerfectDay;
