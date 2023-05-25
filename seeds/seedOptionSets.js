//optionsetsseeds
const OptionSets = require('../models/OptionSets');
const faker = require('faker');

const seedOptionSets = async (numCategories = 10) => {
    const optionSetsData = [];

    for (let i = 0; i < numCategories; i++) {
        const optionSets = {
            option1: faker.lorem.words(Math.round(Math.random() * 5) + 1),
            option2: faker.lorem.words(Math.round(Math.random() * 5) + 1),
        };
        optionSetsData.push(optionSets);
    }
    await OptionSets.bulkCreate(optionSetsData);
};

module.exports = seedOptionSets;
