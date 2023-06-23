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

        // const tipoUsuario = decoded.tipoUsuario;

        // if (tipoUsuario === 'servidor') {
        //     // Logica de permissoes 
        //     // req.permissao = 'servidor';
        // } else if (tipoUsuario === 'aluno') {
        //     // Logica de permissoes 
        //     // req.permissao = 'aluno';
        // } else if (tipoUsuario === 'comunidadeExterna') {
        //     // Logica de permissoes 
        //     // req.permissao = 'comunidadeExterna';
        // } else {
        //     return res.status(403).json({ error: 'Invalid user type.' });
        // }
        return next();

    } catch ( error ) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
}
