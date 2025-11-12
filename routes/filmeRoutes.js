/***************************************************************************************************** 
 * Objetivo: Arquivo de rotas para os EndPoints de Filme
 * Data: 22/10/2025
 * Autor: Weslei Santos
 * Versão: 1.0
*****************************************************************************************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const controllerFilme = require('../controller/filme/controller_filme');

const bodyParserJSON = bodyParser.json();

// 1° EndPoints para listar filmes
router.get('/v1/locadora/filme', cors(), async (request, response) => {
    let filme = await controllerFilme.listarFilmes();
    response.status(filme.status_code).json(filme);
});

// 2° EndPoints para buscar filme por ID
router.get('/v1/locadora/filme/:id', cors(), async (request, response) => {
    let id = request.params.id;
    let filme = await controllerFilme.buscarFilmeID(id);
    response.status(filme.status_code).json(filme);
});

// 3° EndPoints para inserir novo filme
router.post('/v1/locadora/filme', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType);
    response.status(filme.status_code).json(filme);
});

// 4° EndPoints para atualizar filme
router.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async (request, response) => {
    let idFilme = request.params.id;
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType);
    response.status(filme.status_code).json(filme);
});

// 5° EndPoints para excluir filme
router.delete('/v1/locadora/filme/:id', cors(), async (request, response) => {
    let idFilme = request.params.id;
    let filme = await controllerFilme.excluirFilme(idFilme);
    response.status(filme.status_code).json(filme);
});

module.exports = router;
