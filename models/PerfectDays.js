const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./Users');

class PerfectDay extends Model {}

PerfectDay.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // Update to the actual table name 'users'
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
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

//PerfectDay.belongsTo(User, { foreignKey: 'user_id' });

module.exports = PerfectDay;
