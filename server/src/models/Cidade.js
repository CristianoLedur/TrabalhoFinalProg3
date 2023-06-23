import Sequelize, { Model } from 'sequelize';

class Cidade extends Model {

    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                estado: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        
        this.belongsToMany(models.DemandaSugerida, {
            through: 'demandasugeridacidade',
            foreignKey: 'cidadeId',
            as: 'demandasugerida',
        });

        this.belongsToMany(models.DemandaSolicitada, {
            through: 'demandasolicitadacidade',
            foreignKey: 'cidadeId',
            as: 'demandasolicitada',
        });

        this.belongsToMany(models.Atividade, {
            through: 'atividadecidade',
            foreignKey: 'cidadeId',
            as: 'atividade',
        });

    }
    
}

export default Cidade;

/* Qual a relação do "static e init" com a classe Database (do arquivo index.js)? */