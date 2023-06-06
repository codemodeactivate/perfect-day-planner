const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Subscriber extends Model {}

Subscriber.init (

{
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'subscriber'
}

)

// Sync the model with the database
Subscriber.sync()
    .then(() => console.log('SelectedOption table has been synced'))
    .catch(error => console.log('An error occurred', error));

module.exports = Subscriber;
