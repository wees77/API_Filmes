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

/**
 * @swagger
 * tags:
 *   name: Países
 *   description: Endpoints relacionados aos países de origem dos filmes
 */

/**
 * @swagger
 * /v1/locadora/paises:
 *   get:
 *     summary: Lista todos os países
 *     tags: [Países]
 *     responses:
 *       200:
 *         description: Lista de países retornada com sucesso
 */
router.get('/v1/locadora/paises', cors(), async (request, response) => {
    let pais = await controllerPaises.listarPais();
    response.status(pais.status_code).json(pais);
});

/**
 * @swagger
 * /v1/locadora/pais/{id}:
 *   get:
 *     summary: Busca um país pelo ID
 *     tags: [Países]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: País encontrado
 *       404:
 *         description: País não encontrado
 */
router.get('/v1/locadora/pais/:id', cors(), async (request, response) => {
    let id = request.params.id;
    let pais = await controllerPaises.buscarPaisID(id);
    response.status(pais.status_code).json(pais);
});

/**
 * @swagger
 * /v1/locadora/pais:
 *   post:
 *     summary: Cadastra um novo país
 *     tags: [Países]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Brasil"
 *     responses:
 *       201:
 *         description: País cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/v1/locadora/pais', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let pais = await controllerPaises.inserirPais(dadosBody, contentType);
    response.status(pais.status_code).json(pais);
});

/**
 * @swagger
 * /v1/locadora/pais/{id}:
 *   put:
 *     summary: Atualiza um país
 *     tags: [Países]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: País atualizado com sucesso
 *       404:
 *         description: País não encontrado
 */
router.put('/v1/locadora/pais/:id', cors(), bodyParserJSON, async (request, response) => {
    let idPais = request.params.id;
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let pais = await controllerPaises.atualizarPais(dadosBody, idPais, contentType);
    response.status(pais.status_code).json(pais);
});

/**
 * @swagger
 * /v1/locadora/pais/{id}:
 *   delete:
 *     summary: Remove um país
 *     tags: [Países]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: País excluído com sucesso
 *       404:
 *         description: País não encontrado
 */
router.delete('/v1/locadora/pais/:id', cors(), async (request, response) => {
    let idPais = request.params.id;
    let pais = await controllerPaises.excluirPais(idPais);
    response.status(pais.status_code).json(pais);
});

module.exports = router;
