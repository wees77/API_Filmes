/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de atores
 * Data: 12/11/2025
 * Autor: Weslei Santos
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const controllerAtor = require('../controller/ator/controller_ator');

const bodyParserJSON = bodyParser.json();

// 1° EndPoints para listar classificações
router.get('/v1/locadora/atores', cors(), async (request, response) => {
    let atores = await controllerAtor.listarAtores();
    response.status(atores.status_code).json(atores);
});

// 2° EndPoint: buscar ator por ID
router.get('/v1/locadora/ator/:id', cors(), async (request, response) => {
    let id = request.params.id;
    let ator = await controllerAtor.buscarAtorPorId(id);
    response.status(ator.status_code).json(ator);
});

// 3° EndPoints para inserir novo ator
router.post('/v1/locadora/ator', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let ator = await controllerAtor.inserirAtor(dadosBody, contentType);
    response.status(ator.status_code).json(ator);
});

// 4° EndPoints para atualizar ator
router.put('/v1/locadora/ator/:id', cors(), bodyParserJSON, async (request, response) => {
    let idAtor = request.params.id;
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let ator = await controllerAtor.atualizarAtor(dadosBody, idAtor, contentType);
    response.status(ator.status_code).json(ator);
});


module.exports = router;