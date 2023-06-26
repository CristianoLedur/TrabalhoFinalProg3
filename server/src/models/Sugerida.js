import Sequelize, { Model } from 'sequelize';

class Sugerida extends Model {

    static init(sequelize) {
        super.init(
            {
                status: Sequelize.ENUM('Aceita', 'Em avaliação', 'A reformular', 'Cancelada'),
                titulo: Sequelize.STRING,
                comentario: Sequelize.INTEGER,
                quantidadeInteressados: Sequelize.INTEGER,
                descricao: Sequelize.STRING,
                diasEturnos: Sequelize.STRING,
                modalidade: Sequelize.STRING,
                categoria: Sequelize.STRING,
                tipoDemanda: Sequelize.STRING
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

        /* Relacionar com uma ou várias cidades */ 
        this.belongsToMany(models.Cidade, {
            through: 'sugeridacidade',
            foreignKey: 'sugeridaId',
            as: 'cidade',
        });

        /* Atividade Relacionada */
        this.belongsTo(models.Atividade, {foreignKey: 'atividadeId', as: 'atividade'});
    }
}

export default Sugerida;