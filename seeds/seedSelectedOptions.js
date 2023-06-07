const SelectedOption = require('../models/SelectedOptions');
const OptionSet = require('../models/OptionSets');
const faker = require('faker');

const seedSelectedOptions = async (numCategories = 10) => {
  const selectedOptionsData = [];

  // Fetch all OptionSets to get the available options
  const optionSets = await OptionSet.findAll();

  for (let i = 0; i < numCategories; i++) {
    // Get a random OptionSet
    const randomOptionSet = optionSets[Math.floor(Math.random() * optionSets.length)];

    // Get a random option from the selected OptionSet
    const randomOption = faker.random.arrayElement([randomOptionSet.option1, randomOptionSet.option2]);

    const selectedOptions = {
      SelectedOption: randomOption,
      option_set_id: randomOptionSet.id
    };
    selectedOptionsData.push(selectedOptions);
  }

  // Delete all existing selected options
  await SelectedOption.destroy({ truncate: true });

  // Create new selected options
  await SelectedOption.bulkCreate(selectedOptionsData);
};

module.exports = seedSelectedOptions;
