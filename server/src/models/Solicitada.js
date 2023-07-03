import Sequelize, { Model } from 'sequelize';

class Solicitada extends Model {

    static init(sequelize) {
        super.init(
            {
                status: Sequelize.ENUM('Aceita', 'Em avaliação', 'A reformular', 'Cancelada'),
                titulo: Sequelize.STRING,
                comentario: Sequelize.INTEGER,
                quantidadeInteressados: Sequelize.INTEGER,
                observacao: Sequelize.STRING,
                tipoDemanda: Sequelize.STRING
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});

        this.belongsToMany(models.Cidade, {
            through: 'solicitadacidade',
            foreignKey: 'solicitadaId',
            as: 'cidade',
        });

        this.belongsTo(models.Atividade, {foreignKey: 'atividadeId', as: 'atividade'});
    }
}

export default Solicitada;