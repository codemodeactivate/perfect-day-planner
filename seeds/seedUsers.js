//users seeds
const Users = require('../models/Users');
const faker = require('faker');

const seedUsers = async (numUsers = 10) => {
    const usersData = [];

    for (let i = 0; i < numUsers; i++) {
        const users = {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };
        usersData.push(users);
    }
    await Users.bulkCreate(usersData);
};

module.exports = seedUsers;
