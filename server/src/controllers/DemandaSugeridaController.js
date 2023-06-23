import DemandaSugerida from '../models/DemandaSugerida.js';
import User from '../models/User.js';
import Cidade from '../models/Cidade.js';
import Atividade from '../models/Atividade.js';
import * as Yup from 'yup';

class DemandaSugeridaController {

    async index(req, res) {
        let demandas = await DemandaSugerida.findAll({
            attributes:['id', 'titulo', 'descricao', 'status', 'modalidade', 'diasEturnos', 'categoria', 'quantidadeInteressados', 'comentario', 'createdAt', 'updatedAt'],
            include: [ 
                {
                    model: User,
                    as: 'user',
                    attributes:['id', 'nome', 'email']
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

        let demanda = await DemandaSugerida.findOne({
            where: { id },
            include: [ 
                {
                    model: User,
                    as: 'user',
                    attributes:['id', 'nome', 'email']
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
            descricao: Yup.string().required(),
            modalidade: Yup.string().required(),
            diasEturnos: Yup.string().required(),
            categoria: Yup.string().required(),
            quantidadeInteressados: Yup.number().required(),
            comentario: Yup.string(),
            userId: Yup.number().required(),
            cidadeId: Yup.number(),
            atividadeId: Yup.number(),
        }); 

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error:'Schema is not valid.' });
        }

        const { cidade } = req.body;

        const { status, titulo, descricao, modalidade, categoria, diasEturnos, quantidadeInteressados, comentario, userId, atividadeId } = req.body; 

        let demanda = await DemandaSugerida.findAll({
            where: { titulo }
        });

        if( !demanda || demanda.length == 0 ) {
            demanda = await DemandaSugerida.create( {
                status,
                titulo,
                descricao,
                modalidade,
                categoria,
                diasEturnos,
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
            titulo: Yup.string().required(),
            observacao: Yup.string().required(),
            modalidade: Yup.string().required(),
            diasEturnos: Yup.string().required(),
            quantidadeInteressados: Yup.number().required(),
            comentario: Yup.string(),
            userId: Yup.number().required(),
            cidadeId: Yup.number(),
            idAtividade: Yup.number(),
        }); 

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error:'Schema is not valid.' });
        }


        const { id } = req.params;
        const { cidade } = req.body;
        const { status, titulo, observacao, modalidade, diasEturnos, quantidadeInteressados, comentario, userId, idAtividade } = req.body; 

        const dados = {
            status,
            titulo,
            observacao,
            modalidade,
            diasEturnos,
            quantidadeInteressados,
            comentario,
            userId,
            idAtividade
        }

        const demanda = await DemandaSugerida.findByPk(id, {
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

        await DemandaSugerida.destroy({
            where: { id }
        });

        return res.send();
    }
}

export default new DemandaSugeridaController();