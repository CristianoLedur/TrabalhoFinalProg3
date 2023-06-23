import Atividade from '../models/Atividade.js';
import User from '../models/User.js';
import Cidade from '../models/Cidade.js';
import * as Yup from 'yup';

class AtividadeController {

    async index(req, res) {
        let atividades = await Atividade.findAll({
            attributes:['id', 'titulo', 'descricao', 'status', 'modalidade', 'diasEturnos', 'categoria', 'quantidadeVagas', 'createdAt', 'updatedAt'],
            include: [ 
                {
                    model: User,
                    as: 'user',
                    attributes:['id','nome', 'email']
                },
                {
                    model: Cidade,
                    as: 'cidade',
                    through: {
                        attributes: []
                    }
                    
                }, 
            ]
        });
        return res.json( atividades );
    }

    async show(req, res) {
        
        const schema = Yup.object().shape({
            id: Yup.number().required(),
        });

        if(!(await schema.isValid(req.query))) {
            return res.status(400).json({ error: 'Schema is not valid.' });
        }

        const { id } = req.query;

        let atividade = await Atividade.findOne({
            where: { id },
            include: [ 
                {
                    model: User,
                    as: 'user',
                    attributes:['id','nome', 'email']
                },
                {
                    model: Cidade,
                    as: 'cidade',
                    through: {
                        attributes: []
                    }
                    
                }, 
            ]
        });

        return res.json( atividade );
    }

    async store(req, res) {
        
        const schema = Yup.object().shape({
            status: Yup.string().required(),
            titulo: Yup.string().required(),
            descricao: Yup.string().required(),
            modalidade: Yup.string().required(),
            categoria: Yup.string().required(),
            diasEturnos: Yup.string().required(),
            quantidadeVagas: Yup.number().required(),
            userId: Yup.number().required(),
            cidadeId: Yup.number(),
        });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Schema is not valid.' });
        }

        const { cidade } = req.body;
        
        const { status, titulo, descricao, modalidade, categoria, diasEturnos, userId } = req.body;

        let atividade = await Atividade.findAll({
            where: {titulo}
        });

        if( !atividade || atividade.length == 0 ) {
            atividade = await Atividade.create({
                status,
                titulo,
                descricao,
                modalidade,
                categoria,
                diasEturnos,
                userId,
            });
        }

        if( cidade && cidade.length > 0 ) {
            atividade.setCidade(cidade);
        }

        return res.json( atividade );

    }

    async update(req, res) {
        
        const schemaId = Yup.object().shape({
            id: Yup.number().required(),
        });

        if(!(await schemaId.isValid(req.params))) {
            return res.status(400).json({ error: 'Schema is not valid. '});
        }

        const schema = Yup.object().shape({
            status: Yup.string().required(),
            titulo: Yup.string().required(),
            descricao: Yup.string().required(),
            modalidade: Yup.string().required(),
            categoria: Yup.string().required(),
            diasEturnos: Yup.string().required(), 
            quantidadeVagas: Yup.number().required(),
            userId: Yup.number().required(),
            cidadeId: Yup.number(),
        });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Schema is not valid.' });
        }

        const { id } = req.params;
        const { cidade } = req.body;

        const { status, titulo, descricao, modalidade, categoria, diasEturnos, quantidadeVagas, userId } = req.body; 

        const dados = {
            status,
            titulo,
            descricao,
            modalidade,
            categoria,
            diasEturnos,
            quantidadeVagas,
            userId
        }
        
        const atividade = await Atividade.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes:['id','nome', 'email']
                },
                {
                    model: Cidade,
                    as: 'cidade',
                    through: {
                        attributes: []
                    }
                }
            ]
        });
          
        if (!atividade) {
            return res.status(404).json({ error: 'Atividade not found.' });
        }
        
        await atividade.update(dados); // Atualiza os dados da atividade
        
        if (cidade && cidade.length > 0) {
            await atividade.setCidade(cidade); // Atualiza a relação com as cidades
        }
        
        return res.send();

    }

    async destroy(req, res) {

        const schema = Yup.object().shape({
            id: Yup.number().required(),
        });

        if(!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: 'Schema is not valid.' });
        }

        const { id } = req.params;

        await Atividade.destroy({
            where: { id }
        });

        res.send();
    }
}

export default new AtividadeController();