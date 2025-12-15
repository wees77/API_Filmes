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

<<<<<<< HEAD
/**
 * @swagger
 * tags:
 *   name: Atores
 *   description: Endpoints relacionados a atores
 */


/**
 * @swagger
 * /v1/locadora/atores:
 *   get:
 *     summary: Lista todos os atores
 *     tags: [Atores]
 *     responses:
 *       200:
 *         description: Lista de atores retornada com sucesso
 */
=======
// 1° EndPoints para listar classificações
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
router.get('/v1/locadora/atores', cors(), async (request, response) => {
    let atores = await controllerAtor.listarAtores();
    response.status(atores.status_code).json(atores);
});

<<<<<<< HEAD
/**
 * @swagger
 * /v1/locadora/ator/{id}:
 *   get:
 *     summary: Busca um ator pelo ID
 *     tags: [Atores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ator encontrado
 *       404:
 *         description: Ator não encontrado
 */
=======
// 2° EndPoint: buscar ator por ID
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
router.get('/v1/locadora/ator/:id', cors(), async (request, response) => {
    let id = request.params.id;
    let ator = await controllerAtor.buscarAtorPorId(id);
    response.status(ator.status_code).json(ator);
});

<<<<<<< HEAD
/**
 * @swagger
 * /v1/locadora/ator:
 *   post:
 *     summary: Cadastra um novo ator
 *     tags: [Atores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 example: "1990-01-01"
 *     responses:
 *       201:
 *         description: Ator cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
=======
// 3° EndPoints para inserir novo ator
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
router.post('/v1/locadora/ator', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let ator = await controllerAtor.inserirAtor(dadosBody, contentType);
    response.status(ator.status_code).json(ator);
});

<<<<<<< HEAD
/**
 * @swagger
 * /v1/locadora/ator/{id}:
 *   put:
 *     summary: Atualiza um ator
 *     tags: [Atores]
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
 *         description: Ator atualizado com sucesso
 *       404:
 *         description: Ator não encontrado
 */
=======
// 4° EndPoints para atualizar ator
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
router.put('/v1/locadora/ator/:id', cors(), bodyParserJSON, async (request, response) => {
    let idAtor = request.params.id;
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let ator = await controllerAtor.atualizarAtor(dadosBody, idAtor, contentType);
    response.status(ator.status_code).json(ator);
});


module.exports = router;