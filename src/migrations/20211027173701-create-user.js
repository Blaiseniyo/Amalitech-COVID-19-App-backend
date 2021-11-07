'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        default: Sequelize.fn('uuid_generate_v4'),
        type: Sequelize.UUID
      },
      // userName: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      //   unique:true,
      // },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      password:{
        type:Sequelize.STRING,
        allowNull:true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};