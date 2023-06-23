'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('demandasugerida', {
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
      quantidadeInteressados: {
        type: Sequelize.INTEGER,
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
      comentario: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      diasEturnos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false, 
      },
      atividadeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'atividade',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      cidadeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cidade',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('demandasugerida');
  }
};
