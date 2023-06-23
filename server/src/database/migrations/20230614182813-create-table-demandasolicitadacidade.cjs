'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('demandasolicitadacidade', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      demandaSolicitadaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'demandasolicitada',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      cidadeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cidade',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('demandasolicitadacidade');
  }
};
