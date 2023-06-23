import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';
import User from '../models/User.js';
import DemandaSugerida from '../models/DemandaSugerida.js';
import DemandaSolicitada from '../models/DemandaSolicitada.js';
import Atividade from '../models/Atividade.js';
import Cidade from '../models/Cidade.js';

const models = [User, DemandaSugerida, DemandaSolicitada, Atividade, Cidade];

class Database {

    constructor() {
        this.init();
    }

    init() {
        // Faz a conexão com o BD
        this.connection = new Sequelize(databaseConfig);

        // Carrega os models e associaçoes com map
        models
            .map( model => model.init(this.connection) )
            .map( model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();