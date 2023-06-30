import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';


export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ error: 'Token does not exist.' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await jwt.verify( token, authConfig.secret);
        req.userId = decoded.id;
        req.tipoUsuario = decoded.tipoUsuario;
        return next();

    } catch ( error ) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
}
