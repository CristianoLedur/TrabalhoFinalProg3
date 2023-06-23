import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

class User extends Model {

    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                status: Sequelize.ENUM('ativo', 'inativo'),
                tipoUsuario: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        this.addHook('beforeSave', async (user) => {
            if(user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
                /* poderia usar genSalt para aumentar a segurança */
            }
        });

        return this;
    }

    async checkPassword(password) {
        return await bcrypt.compare(password, this.password_hash);
    }

    static associate(models) {
        /* Relacionar com uma ou várias cidades */
        this.belongsTo(models.Cidade, {foreignKey: 'cidadeId', as: 'cidade'});
    }
}

export default User;
