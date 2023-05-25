//optionsetsseeds
const OptionSets = require('../models/OptionSets');
const faker = require('faker');

const seedOptionSets = async (numCategories = 10) => {
    const optionSetsData = [];

    for (let i = 0; i < numCategories; i++) {
        const optionSets = {
            category: faker.lorem.words(Math.floor(Math.random() * 3) + 1),
            perfect_day_id: Math.floor(Math.random() * 10) + 1
        };
        optionSetsData.push(optionSets);
    }
    await OptionSets.bulkCreate(optionSetsData);
};

module.exports = seedOptionSets;
