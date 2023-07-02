import Solicitada from '../models/Solicitada.js';
import User from '../models/User.js';
import Cidade from '../models/Cidade.js';
import Atividade from '../models/Atividade.js';
import * as Yup from 'yup';

class SolicitadaController {

    async index(req, res) {
        let demandas = await Solicitada.findAll({
            attributes:['id', 'titulo', 'observacao', 'status', 'quantidadeInteressados', 'comentario', 'tipoDemanda', 'createdAt', 'updatedAt'],
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
                {
                    model: Atividade,
                    as: 'atividade',
                    attributes:['id','titulo', 'descricao', 'cidadeId']
                },  
            ]
        });
        return res.json( demandas );
    }

    async show(req, res) {
        
        const schema = Yup.object().shape({
            id: Yup.number().required(),
        });

        if(!(await schema.isValid(req.query))) {
            return res.status(400).json({ error:'Schema is not valid.' });
        }

        const { id } = req.query;

        let demanda = await Solicitada.findOne({
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
                {
                    model: Atividade,
                    as: 'atividade',
                    attributes:['id','titulo', 'descricao']
                    
                },
            ]
        });

        return res.json( demanda );
    }

    async store(req, res) {
        
        const schema = Yup.object().shape({
            status: Yup.string().required(),
            titulo: Yup.string().required(),
            observacao: Yup.string().required(),
            quantidadeInteressados: Yup.number().required(),
            tipoDemanda: Yup.string().required(),
            userId: Yup.number().required(),
            cidadeId: Yup.number(),
            atividadeId: Yup.number().required(),
        }); 

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error:'Schema is not valid.' });
        }

        const { cidade } = req.body;

        const { status, titulo, observacao, quantidadeInteressados, comentario, tipoDemanda, userId, atividadeId } = req.body; 

        let demanda = await Solicitada.findAll({
            where: { titulo, userId }
        });

        if( !demanda || demanda.length == 0 ) {
            demanda = await Solicitada.create( {
                status,
                titulo,
                observacao,
                quantidadeInteressados,
                comentario,
                tipoDemanda,
                userId,
                atividadeId
            });
        }

        if( cidade && cidade.length > 0 ) {
            demanda.setCidade(cidade);
        }

        return res.json( demanda );
    }

    async update(req, res) {
        const schemaId = Yup.object().shape({
            id: Yup.number().required(),
        });

        if(!(await schemaId.isValid(req.params))) {
            return res.status(400).json({ error:'Schema is not valid.' });
        }

        const schema = Yup.object().shape({
            status: Yup.string().required(),
            titulo: Yup.string(),
            observacao: Yup.string(),
            quantidadeInteressados: Yup.number().required(),
            tipoDemanda: Yup.string().required(),
            userId: Yup.number().required(),
            cidadeId: Yup.number(),
            atividadeId: Yup.number().required(),
        }); 

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error:'Schema is not valid.' });
        }

        const { id } = req.params;
        const { cidade } = req.body;

        const { status, titulo, observacao, quantidadeInteressados, comentario, tipoDemanda, userId, atividadeId } = req.body; 

        const dados = {
            status,
            titulo,
            observacao,
            quantidadeInteressados,
            comentario,
            tipoDemanda,
            userId,
            atividadeId
        }

        const demanda = await Solicitada.findByPk(id, {
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
                {
                    model: Atividade,
                    as: 'atividade',
                    attributes:['id','titulo', 'descricao']
                }
            ]
        });

        if (!demanda) {
            return res.status(404).json({ error: 'Demanda not found.' });
        }
        
        await demanda.update(dados); // Atualiza os dados da demanda
        
        if (cidade && cidade.length > 0) {
            await demanda.setCidade(cidade); // Atualiza a relação com as cidades
        }

        return res.send();
    }

    async destroy(req, res) {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        });

        if(!(await schema.isValid(req.params))) {
            return res.status(400).json({ error:'Schema is not valid.' });
        }

        const { id } = req.params;

        await Solicitada.destroy({
            where: { id }
        });

        return res.send();
    }
}

export default new SolicitadaController();