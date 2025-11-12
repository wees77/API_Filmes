/***************************************************************************************************** 
 * Objetivo: Arquivo de rotas para os EndPoints de País de Origem
 * Data: 04/10/2025
 * Autor: Weslei Santos
 * Versão: 1.0
*****************************************************************************************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const controllerPaises = require('../controller/pais_origem/controller_pais_origem');

const bodyParserJSON = bodyParser.json();

// 1° EndPoints para listar paises
router.get('/v1/locadora/paises', cors(), async (request, response) => {
    let pais = await controllerPaises.listarPais();
    response.status(pais.status_code).json(pais);
});

// 2° EndPoints para buscar país por ID
router.get('/v1/locadora/pais/:id', cors(), async (request, response) => {
    let id = request.params.id;
    let pais = await controllerPaises.buscarPaisID(id);
    response.status(pais.status_code).json(pais);
});

// 3° EndPoints para inserir novo país
router.post('/v1/locadora/pais', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let pais = await controllerPaises.inserirPais(dadosBody, contentType);
    response.status(pais.status_code).json(pais);
});

// 4° EndPoints para atualizar pais
router.put('/v1/locadora/pais/:id', cors(), bodyParserJSON, async (request, response) => {
    let idPais= request.params.id;
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let pais = await controllerPaises.atualizarPais(dadosBody, idPais, contentType);
    response.status(pais.status_code).json(pais);
});

// 5° EndPoints para excluir país
router.delete('/v1/locadora/pais/:id', cors(), async (request, response) => {
    let idPais = request.params.id;
    let pais = await controllerPaises.excluirPais(idPais);
    response.status(pais.status_code).json(pais);
})

module.exports = router;