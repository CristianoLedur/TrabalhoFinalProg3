import DemandaSolicitada from '../models/DemandaSolicitada.js';
import User from '../models/User.js';
import Cidade from '../models/Cidade.js';
import Atividade from '../models/Atividade.js';
import * as Yup from 'yup';

class DemandaSolicitadaController {

    async index(req, res) {
        let demandas = await DemandaSolicitada.findAll({
            attributes:['id', 'titulo', 'observacao', 'status', 'quantidadeInteressados', 'comentario', 'createdAt', 'updatedAt'],
            include: [ 
                {
                    model: User,
                    as: 'user',
                    through: {
                        attributes:['id','nome', 'email']
                    }
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
                    through: {
                        attributes: []
                    }
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

        let demanda = await DemandaSolicitada.findAll({
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
                    through: {
                        attributes: []
                    }
                    
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
            comentario: Yup.string(),
            userId: Yup.number().required(),
            atividadeId: Yup.number().required(),
        }); 

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error:'Schema is not valid.' });
        }

        const { cidade } = req.body;
        const { status, titulo, observacao, quantidadeInteressados, comentario, userId, atividadeId } = req.body; 

        let demanda = await DemandaSolicitada.findAll({
            where: { titulo }
        });

        if( !demanda || demanda.length == 0 ) {
            demanda = await DemandaSolicitada.create( {
                status,
                titulo,
                observacao,
                quantidadeInteressados,
                comentario,
                userId,
                atividadeId,
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
            comentario: Yup.string(),
            userId: Yup.number().required(),
            atividadeId: Yup.number().required(),
        }); 

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error:'Schema is not valid.' });
        }

        const { id } = req.params;
        const { cidade } = req.body;
        const { status, titulo, observacao, quantidadeInteressados, comentario, userId, atividadeId } = req.body; 

        const dados = {
            status,
            titulo,
            observacao,
            quantidadeInteressados,
            comentario,
            userId,
            atividadeId
        }

        const demanda = await DemandaSolicitada.findByPk(id, {
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
                    through: {
                        attributes: []
                    }
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

        await DemandaSolicitada.destroy({
            where: { id }
        });

        return res.send();
    }
}

export default new DemandaSolicitadaController();