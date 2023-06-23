import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authConfig from '../config/auth.js';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;
        console.log(email);
        console.log(password);

        //Email existe?
        const user = await User.findOne({ where : { email } });
        if( !user ) {
            return res.status(401).json({ error: 'User not found.' });
        }

        //Senha incorreta?
        if(!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Incorrect password.' });
        }

        const { id, nome, tipoUsuario, status } = user;
        return res.json({
            user: {
                id,
                nome,
                email,
                tipoUsuario,
                status
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            } ),
        });
    }
}

export default new SessionController();