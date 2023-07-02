import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authConfig from '../config/auth.js';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

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
        user.status = 'online';
        await user.save();

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

    async destroy(req, res) {
        const { id } = req.body;
    
        try {
            const user = await User.findByPk(id);
            
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }
            user.status = 'offline';
            await user.save();
            
            return res.json({ message: 'User status updated successfully.' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
}

export default new SessionController();