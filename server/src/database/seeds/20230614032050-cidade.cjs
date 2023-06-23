'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cidade', [
      {
        nome: "Bom princípio",
        estado: "RS",
        createdAt: "2023-06-14 10:00:00",
        updatedAt: "2023-06-14 10:00:00",
      },
      {
        nome: "Feliz",
        estado: "RS",
        createdAt: "2023-06-14 10:00:00",
        updatedAt: "2023-06-14 10:00:00",
      },
      {
        nome: "São Vendelino",
        estado: "RS",
        createdAt: "2023-06-14 10:00:00",
        updatedAt: "2023-06-14 10:00:00",
      },
      {
        nome: "São Sebastião do Caí",
        estado: "RS",
        createdAt: "2023-06-14 10:00:00",
        updatedAt: "2023-06-14 10:00:00",
      },
      {
        nome: "Alto Feliz",
        estado: "RS",
        createdAt: "2023-06-14 10:00:00",
        updatedAt: "2023-06-14 10:00:00",
      },
      {
        nome: "Vale Real",
        estado: "RS",
        createdAt: "2023-06-14 10:00:00",
        updatedAt: "2023-06-14 10:00:00",
      },
      {
        nome: "Tupandi",
        estado: "RS",
        createdAt: "2023-06-14 10:00:00",
        updatedAt: "2023-06-14 10:00:00",
      },
      {
        nome: "Harmonia",
        estado: "RS",
        createdAt: "2023-06-14 10:00:00",
        updatedAt: "2023-06-14 10:00:00",
      },
      {
        nome: "Linha Nova",
        estado: "RS",
        createdAt: "2023-06-14 10:00:00",
        updatedAt: "2023-06-14 10:00:00",
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cidade', null, {});
  }
};
