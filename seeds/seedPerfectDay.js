//perfect day seeds
const PerfectDays = require('../models/PerfectDays');
const faker = require('faker');

const seedPerfectDays = async (numPerfectDays = 10) => {
    const perfectDaysData = [];

    for (let i = 0; i < numPerfectDays; i++) {
        const perfectDays = {
            user_id: Math.floor(Math.random() * 10) + 1,
            title: faker.lorem.words(3), // generates a title of 3 words
            date_created: faker.date.past(), // generates a random past date
            status: faker.random.arrayElement(['Completed', 'In progress', 'Not started']), // randomly picks one of the statuses
            description: faker.lorem.paragraph() // generates a random paragraph
        };
        perfectDaysData.push(perfectDays);
    }
    await PerfectDays.bulkCreate(perfectDaysData);
};

module.exports = seedPerfectDays;
