//perfect day seeds
const PerfectDays = require('../models/PerfectDays');
const faker = require('faker');

const seedPerfectDays = async (numPerfectDays = 10) => {
    const perfectDaysData = [];

    for (let i = 0; i < numPerfectDays; i++) {
        const perfectDays = {
            user_id: Math.floor(Math.random() * 10) + 1
        };
        perfectDaysData.push(perfectDays);
    }
    await PerfectDays.bulkCreate(perfectDaysData);
};

module.exports = seedPerfectDays;
