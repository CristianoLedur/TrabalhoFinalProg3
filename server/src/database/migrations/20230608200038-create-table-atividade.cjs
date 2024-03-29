'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('atividade', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: Sequelize.ENUM('Aceita', 'Em avaliação', 'A reformular', 'Cancelada'),
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      modalidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      diasEturnos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantidadeVagas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      cidadeId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'cidade',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('atividade');
  }
};
