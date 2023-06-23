import Sequelize, { Model } from 'sequelize';

class Atividade extends Model {
    static init(sequelize) {
        super.init(
            {
                status: Sequelize.ENUM('Aceita', 'Em avaliação', 'A reformular', 'Cancelada'),
                titulo: Sequelize.STRING,
                descricao: Sequelize.STRING,
                modalidade: Sequelize.STRING,
                categoria: Sequelize.STRING,
                diasEturnos: Sequelize.STRING,
                quantidadeVagas: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        /* Relacionar com o usuário que cadastrou */
        this.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});

        /* Relacionar com zero ou várias cidades */ 
        this.belongsToMany(models.Cidade, {
            through: 'atividadecidade',
            foreignKey: 'atividadeId',
            as: 'cidade',
        });
    }
}

export default Atividade;
