const OptionSet = require('./OptionSets');
const PerfectDay = require('./PerfectDays');
const SelectedOption = require('./SelectedOptions');
const User = require('./Users');
const Sequelize = require('sequelize');


User.hasMany(PerfectDay, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

PerfectDay.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

PerfectDay.hasMany(OptionSet,
    {
        foreignKey: 'perfect_day_id',
        onDelete: 'CASCADE',
        as: 'options'
});

OptionSet.belongsTo(PerfectDay, {
    foreignKey: 'perfect_day_id',
    onDelete: 'CASCADE'
});

OptionSet.hasOne(SelectedOption, {
    foreignKey: 'option_set_id',
    onDelete: 'CASCADE'
});

SelectedOption.belongsTo(OptionSet, {
    foreignKey: 'option_set_id',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    PerfectDay,
    OptionSet,
    SelectedOption
};
