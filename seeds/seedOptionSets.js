const OptionSet = require('../models/OptionSets');
const PerfectDay = require('../models/PerfectDays');
const faker = require('faker');

const seedOptionSets = async (numSets = 10) => {
  const perfectDay = await PerfectDay.findOne(); // Assuming there's at least one PerfectDay record in the database

  for (let i = 0; i < numSets; i++) {
    const optionSet = await OptionSet.create({
      option1: faker.lorem.words(Math.round(Math.random() * 5) + 1),
      option2: faker.lorem.words(Math.round(Math.random() * 5) + 1),
      perfect_day_id: perfectDay.id
    });
  }
};

module.exports = seedOptionSets;
