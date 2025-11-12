/***************************************************************************************************** 
 * Objetivo: Arquivo de rotas para os EndPoints de Gênero
 * Data: 22/10/2025
 * Autor: Weslei Santos
 * Versão: 1.0
*****************************************************************************************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const controllerGenero = require('../controller/genero/controller_genero');

const bodyParserJSON = bodyParser.json();

// 1° EndPoints para listar gêneros
router.get('/v1/locadora/genero', cors(), async (request, response) => {
    let genero = await controllerGenero.listarGeneros();
    response.status(genero.status_code).json(genero);
});

// 2° EndPoints para buscar gênero por ID
router.get('/v1/locadora/genero/:id', cors(), async (request, response) => {
    let id = request.params.id;
    let genero = await controllerGenero.buscarGeneroID(id);
    response.status(genero.status_code).json(genero);
});

// 3° EndPoints para inserir novo gênero
router.post('/v1/locadora/genero', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let genero = await controllerGenero.inserirGenero(dadosBody, contentType);
    response.status(genero.status_code).json(genero);
});

// 4° EndPoints para atualizar gênero
router.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async (request, response) => {
    let idGenero = request.params.id;
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType);
    response.status(genero.status_code).json(genero);
});

// 5° EndPoints para excluir gênero
router.delete('/v1/locadora/genero/:id', cors(), async (request, response) => {
    let idGenero = request.params.id;
    let genero = await controllerGenero.excluirGenero(idGenero);
    response.status(genero.status_code).json(genero);
})

module.exports = router;