'use strict';
import {hashPassword} from "../utls/auth"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pass= hashPassword("12345")
    return queryInterface.bulkInsert("Users", [
      {
        id: "fb94de4d-47ff-4079-89e8-b0186c0a3be8",
        email: "john@gmail.com",
        password: pass,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
      id:"122a0d86-8b78-4bb8-b28f-8e5f7811c456",
      email: "johndoe@gmail.com",
      password: pass,
      createdAt: new Date(),
      updatedAt: new Date(),
      
  }
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
