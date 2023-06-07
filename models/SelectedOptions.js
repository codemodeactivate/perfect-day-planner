const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SelectedOption extends Model {}

SelectedOption.init(
    {
        selectedOption: {
            type: DataTypes.ENUM('selected', 'unselected', 'indeterminate'),
            defaultValue: 'unselected'
        },
        option_set_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'option_set',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'selected_option'
    }
);

module.exports = SelectedOption;
