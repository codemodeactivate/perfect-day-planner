const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SelectedOption extends Model {}

SelectedOption.init(
    {
        SelectedOption: DataTypes.STRING,
        option_set_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'OptionSets',
                key: 'id'
        }
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'selectedOption'
});

module.exports = SelectedOption;
