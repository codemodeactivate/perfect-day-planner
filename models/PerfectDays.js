const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PerfectDay extends Model {}

PerfectDay.init(
    {
        userID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
        }
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'perfectDay'
});

module.exports = PerfectDay;
