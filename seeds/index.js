//seedsIndex
const seedOptionSets = require('./seedOptionSets');
const seedPerfectDay = require('./seedPerfectDay');
const seedSelectedOptions = require('./seedSelectedOptions');
const seedUsers = require('./seedUsers');

const sequelize = require('../config/connection');

const seedAll = async () => {
    // console.log("Syncing tables...");
    await sequelize.sync({ force: true });

    // console.log("Seeding users...");
    await seedUsers();

    // console.log("Seeding perfect day...");
    await seedPerfectDay();

    // console.log("Seeding option sets...");
    await seedOptionSets();

    // console.log("Seeding selected options...");
    await seedSelectedOptions();

    process.exit(0);
};

seedAll();
