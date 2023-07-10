"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
    await queryInterface.bulkInsert(
      "admins",
      [
        {
          username: "Shardul",
          email: "shardul@yopmail.com",
          password: "Shardul@123",
          id: 228929,
          createdAt: "19/06/2023",
          updatedAt: "19/06/2023"
        },
        {
          username: "Vishal",
          email: "vishal@yopmail.com",
          password: "Vishal@123",
          id: 228930,
          createdAt: "19/06/2023",
          updatedAt: "19/06/2023"
        },
        {
          username: "Test",
          email: "test@yopmail.com",
          password: "Test@123",
          id: 228931,
          createdAt: "19/06/2023",
          updatedAt: "19/06/2023"
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("People", null, {});
  },
};
