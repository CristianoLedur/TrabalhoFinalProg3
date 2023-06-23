'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('demandasolicitada', {
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
      observacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantidadeInteressados: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comentario: {
        type: Sequelize.STRING,
        allowNull: true,
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
      cidadeId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'cidade',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true, 
      },
      atividadeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'atividade',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
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
    await queryInterface.dropTable('demandasolicitada');
  }
};
