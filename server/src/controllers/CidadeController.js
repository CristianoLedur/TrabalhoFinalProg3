import Cidade from '../models/Cidade.js';
import * as Yup from 'yup';

class CidadeController {

    async index(req, res) {
        let cidades = await Cidade.findAll();

        const cidadesReturn = cidades.map( e => { 
            return {
                id: e.id,
                nome: e.nome,
                estado: e.estado,
            }
        });
        
        return res.json( cidades );
    }

    async show(req, res) {
        
        const schema = Yup.object().shape({
            id: Yup.number().required(),
        });

        if(!(await schema.isValid(req.query))) {
            return res.status(400).json({ error: 'Schema is not valid.' });
        }

        const { id } = req.query;

        let cidade = await Cidade.findAll({
            where: { id }
        });

        return res.json( cidade );
    }

    async store(req, res) {
        
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            estado: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Schema is not valid.' });
        }

        const { nome, estado } = req.body; 

        let cidade = await Cidade.findAll({
            where: { nome }
        });

        if( !cidade || cidade.length == 0 ) {
            cidade = await Cidade.create( {
                nome,
                estado,
            });
        }

        return res.json( cidade );

    }

    async update(req, res) {
        
        const schemaId = Yup.object().shape({
            id: Yup.number().required(),
        });

        if(!(await schemaId.isValid(req.params))) {
            return res.status(400).json({ error: 'Schema is not valid. '});
        }

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            estado: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Schema is not valid.' });
        }

        const { id } = req.params;

        const { nome, estado } = req.body; 

        const dados = {
            nome,
            estado,
        }

        await Cidade.update(dados, {
            where: { 'id': id }
        });

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

        await Cidade.destroy({
            where: { params }
        });

        res.send();
    }
}

export default new CidadeController();
