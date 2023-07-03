import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';
import User from '../models/User.js';
import Sugerida from '../models/Sugerida.js';
import Solicitada from '../models/Solicitada.js';
import Atividade from '../models/Atividade.js';
import Cidade from '../models/Cidade.js';

const models = [User, Sugerida, Solicitada, Atividade, Cidade];

class Database {

    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map( model => model.init(this.connection) )
            .map( model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();