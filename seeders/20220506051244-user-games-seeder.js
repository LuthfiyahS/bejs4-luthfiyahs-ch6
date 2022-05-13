'use strict';
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];
    for (let i = 0; i < 10; i++) {
      let firstName = faker.name.firstName();
      let lastName = faker.name.lastName();
      let email = faker.internet.email(firstName, lastName);
      let makepassword = Math.floor(Math.random() * 190702) + 2002;
      let fullName = firstName+makepassword;
      let password = `pwd${makepassword}`
      data.push({
        username: fullName,
        password: bcrypt.hashSync(password, 8),
        email: email,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    //console.log(data);
    await queryInterface.bulkInsert('user_games', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
