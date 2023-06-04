const PerfectDays = require('../models/PerfectDays');
const faker = require('faker');
const { generateGuestKey } = require('../helpers/guestKey');
const { v4: uuidv4 } = require('uuid');

const seedGuestKey = () => uuidv4();

const seedPerfectDays = async (numPerfectDays = 10) => {
    const perfectDaysData = [];

    for (let i = 0; i < numPerfectDays; i++) {
      const perfectDay = {
        user_id: Math.floor(Math.random() * 10) + 1,
        title: faker.lorem.words(3),
        date_created: faker.date.past(),
        status: faker.random.arrayElement(['Completed', 'In progress', 'Not started']),
        description: faker.lorem.paragraph(),
        url: faker.internet.url(),
        guest_key: seedGuestKey() // Generate a unique guest key
      };

      perfectDaysData.push(perfectDay);
    }

  await PerfectDays.bulkCreate(perfectDaysData);
};

module.exports = seedPerfectDays;
