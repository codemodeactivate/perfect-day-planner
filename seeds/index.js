//seedsIndex
const seedOptionSets = require('./seedOptionSets');
const seedPerfectDay = require('./seedPerfectDay');
const seedSelectedOptions = require('./seedSelectedOptions');
const seedUsers = require('./seedUsers');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();
    await seedOptionSets();
    await seedPerfectDay();
    await seedSelectedOptions();
    await seedUsers();

    process.exit(0);

};

seedAll();
