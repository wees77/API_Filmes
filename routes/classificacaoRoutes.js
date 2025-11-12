/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de classificacao indicativa de filmes
 * Data: 04/11/2025
 * Autor: Weslei Santos
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const controllerClassificacao = require('../controller/classificacao/controller_classificacao');

const bodyParserJSON = bodyParser.json();

// 1° EndPoints para listar classificações
router.get('/v1/locadora/classificacao', cors(), async (request, response) => {
    let classificacao = await controllerClassificacao.listarClassificacoes();
    response.status(classificacao.status_code).json(classificacao);
});

// 2° EndPoint: buscar classificação por ID
router.get('/v1/locadora/classificacao/:id', cors(), async (request, response) => {
    let id = request.params.id;
    console.log('[GET] Rota buscarClassificacaoId acessada!');
    let classificacao = await controllerClassificacao.buscarClassificacaoPorId(id);
    response.status(classificacao.status_code).json(classificacao);
});

// 3° EndPoints para inserir nova classificação
router.post('/v1/locadora/classificacao', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let classificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType);
    response.status(classificacao.status_code).json(classificacao);
});

// 4° EndPoints para atualizar classificação
router.put('/v1/locadora/classificacao/:id', cors(), bodyParserJSON, async (request, response) => {
    let idClassificacao = request.params.id;
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let classificacao = await controllerClassificacao.atualizarClassificacao(dadosBody, idClassificacao, contentType);
    response.status(classificacao.status_code).json(classificacao);
});

// 5° EndPoints para excluir classificação
router.delete('/v1/locadora/classificacao/:id', cors(), async (request, response) => {
    let idClassificacao = request.params.id;
    let classificacao = await controllerClassificacao.excluirClassificacao(idClassificacao);
    response.status(classificacao.status_code).json(classificacao);
});

module.exports = router;