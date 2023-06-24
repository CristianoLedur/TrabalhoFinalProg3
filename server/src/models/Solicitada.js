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
            through: 'solicitadacidade',
            foreignKey: 'solicitadaId',
            as: 'cidade',
        });

        /* Atividade Relacionada */
        this.belongsTo(models.Atividade, {foreignKey: 'atividadeId', as: 'atividade'});
    }
}

export default Solicitada;