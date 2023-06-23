'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('atividadecidade', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      atividadeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'atividade',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      cidadeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cidade',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
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
    await queryInterface.dropTable('atividadecidade');
  }
};