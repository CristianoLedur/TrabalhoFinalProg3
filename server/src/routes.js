import { Router } from 'express';

import authMiddleware from './middlewares/auth.js';
import UserController from './controllers/UserController.js';
import AtividadeController from './controllers/AtividadeController.js';
import SolicitadaController from './controllers/SolicitadaController.js';
import SugeridaController from './controllers/SugeridaController.js';
import SessionController from './controllers/SessionController.js';
import CidadeController from './controllers/CidadeController.js';

const routes = new Router();

routes.get('/cidades', CidadeController.index);
routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);
routes.get('/atividades', AtividadeController.index); 
routes.get('/atividade', AtividadeController.show);

routes.use(authMiddleware);

// Cidade
routes.get('/cidades', CidadeController.index);
routes.get('/cidade', CidadeController.show);
routes.post('/cidade', CidadeController.store);
routes.put('/cidade/:id', CidadeController.update);
routes.delete('/cidade/:id', CidadeController.destroy);

// Users
routes.get('/users', UserController.index); 
routes.get('/user', UserController.show); 
routes.post('/user', UserController.store);
routes.put('/user/:id', UserController.update); 
routes.delete('/user/:id', UserController.destroy);

// Atividades
routes.get('/atividade', AtividadeController.index);
routes.get('/atividade', AtividadeController.show); 
routes.post('/atividade', AtividadeController.store);
routes.put('/atividade/:id', AtividadeController.update);
routes.delete('/atividade/:id', AtividadeController.destroy);

// Demandas Sugeridas
routes.get('/demandas-sugeridas', SugeridaController.index);
routes.get('/demanda-sugerida', SugeridaController.show);
routes.post('/demanda-sugerida', SugeridaController.store);
routes.put('/demanda-sugerida/:id', SugeridaController.update);
routes.delete('/demanda-sugerida/:id', SugeridaController.destroy);

// Demandas Solicitadas
routes.get('/demandas-solicitadas', SolicitadaController.index);
routes.get('/demanda-solicitada', SolicitadaController.show);
routes.post('/demanda-solicitada', SolicitadaController.store);
routes.put('/demanda-solicitada/:id', SolicitadaController.update);
routes.delete('/demanda-solicitada/:id', SolicitadaController.destroy);

export default routes;