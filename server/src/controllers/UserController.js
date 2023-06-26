import User from '../models/User.js';
import Cidade from '../models/Cidade.js';
import Atividade from '../models/Atividade.js';
import Sugerida from '../models/Sugerida.js';
import Solicitada from '../models/Solicitada.js';
import * as Yup from 'yup';

class UserController {

    // Index (GET): array
    async index(req, res) {
        let users = await User.findAll({
            attributes:['id', 'nome', 'email', 'status', 'tipoUsuario'],
            include: [ 
                {
                    model: Cidade,
                    as: 'cidade',
                    attributes:['id','nome', 'estado']
                },
                {
                    model: Atividade,
                    as: 'atividade',
                    attributes:['id','titulo', 'modalidade', 'categoria', 'updatedAt', 'status']
                },
                {
                    model: Sugerida,
                    as: 'sugerida',
                    attributes:['id','titulo', 'tipoDemanda', 'updatedAt', 'status']
                },
                {
                    model: Solicitada,
                    as: 'solicitada',
                    attributes:['id','titulo', 'tipoDemanda', 'updatedAt', 'status']
                }
            ]
            
        });
        return res.json( users );
    }

    // Show (GET): id .../user/id
    async show(req, res) {

        // schema = pode se referir à especificação dos formatos de dados esperados nas solicitações e respostas da API.
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        });

        if(!(await schema.isValid(req.query))) {
            return res.status(400).json({ error: 'Schema is not valid.' });
        }

        const { email } = req.query;

        let user = await User.findAll({
            attributes:['id', 'nome', 'email', 'status', 'tipoUsuario'],
            where: { email },
            include : [
                {
                    model: Cidade,
                    as: 'cidade',
                    attributes:['id','nome', 'estado']
                },
                {
                    model: Atividade,
                    as: 'atividade',
                    attributes:['id','titulo', 'modalidade', 'categoria', 'updatedAt', 'status']
                },
                {
                    model: Sugerida,
                    as: 'sugerida',
                    attributes:['id','titulo', 'tipoDemanda', 'updatedAt', 'status']
                },
                {
                    model: Solicitada,
                    as: 'solicitada',
                    attributes:['id','titulo', 'tipoDemanda', 'updatedAt', 'status']
                }
            ]
            
        });

        return res.json( user );
    }

    // Store (POST): new ...
    async store(req, res) {

        const schema = Yup.object().shape({
            nome: Yup.string().required().min(2),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            status: Yup.string().required(),
            tipoUsuario: Yup.string().required(),
            cidadeId: Yup.number().required(),
        });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Schema is not valid.' });
        }

        const { email } = req.body;
        let user = await User.findAll({
            where: { email }
        });

        // não encontra usuário ou não existe usuário
        if( !user || user.length == 0 ) {
            user = await User.create(req.body);
            return res.json({
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'status': user.status,
                'tipoUsuario': user.tipoUsuario,
                'cidadeId': user.cidadeId
            });
        }
        
        return res.status(400).json({ error: 'User already exists.' });

    }

    // Update (PUT ou PATCH): id
    async update(req, res) {

        const schemaID = Yup.object().shape({
            id: Yup.number().required(),
        });

        if(!(await schemaID.isValid(req.params))) {
            return res.status(400).json({ error: 'Schema is not valid.' });
        }

        const schema = Yup.object().shape({
            nome: Yup.string().required().min(2),
            email: Yup.string().email().required(),
            passwordAntigo: Yup.string().min(6),
            password: Yup.string().min(6)
            .when('passwordAntigo', (passwordAntigo, field) => 
            passwordAntigo ? field.required() : field
            ),
            passwordConfirma: Yup.string().when('password', (password, field) =>
            password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
            status: Yup.string().required(),
            tipoUsuario: Yup.string().required(),
            cidadeId: Yup.number().required(),
        });
        
        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Schema is not valid.' });
        }

        const { id } = req.params;
        const { nome, email } = req.body;

        let user = await User.findByPk(id);
        
        // Não encontrou o usuário 
        if( !user || user.length == 0 ) {
            return res.status(400).json({ error: 'User not found.' });
        }

        // Email diferente do atual (o usuário quer trocar o email)
        if( email !== user.email ) {
            // Verifica se tem alguém com esse novo email
            console.log(email, user.email);
            const userExist = await User.findOne({
                where: { email }
            });
            if( userExist ) {
                return res.status(400).json({
                    error: 'Email already exists in the database.'
                });
            }
        }

        // Verifica se passwordAntigo está correto
        const { passwordAntigo } = req.body;
        
        // erro 401? Erro de digitação?
        if( passwordAntigo && !(await user.checkPassword(passwordAntigo) )) {
            return res.status(401).json({ error: 'Incorrect password. '});
        }

        // Atualiza usando o objeto user (não a classe User)
        await user.update(req.body, {
            where: { id }
        });

        return res.json({
            'id': user.id,
            'nome': user.nome,
            'email': user.email,
            'status': user.status,
            'tipoUsuario': user.tipoUsuario,
            'cidadeId': user.cidadeId
        });
    }

    // Delete (DELETE): id
    async destroy(req, res) {

        const schema = Yup.object().shape({
            id: Yup.number().required(),
        });

        if(!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: 'Schema is not valid.' });
        }

        const { id } = req.params;

        await User.destroy({
            where: { id }
        });

        return res.send();
    }
}

export default new UserController();
