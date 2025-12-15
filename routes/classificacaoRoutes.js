/*******************************************************************************************************************************************************************
<<<<<<< HEAD
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de classificação indicativa de filmes
=======
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de classificacao indicativa de filmes
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
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

<<<<<<< HEAD
/**
 * @swagger
 * tags:
 *   name: Classificações
 *   description: Endpoints relacionados à classificação indicativa de filmes
 */

/**
 * @swagger
 * /v1/locadora/classificacao:
 *   get:
 *     summary: Lista todas as classificações indicativas
 *     tags: [Classificações]
 *     responses:
 *       200:
 *         description: Lista de classificações retornada com sucesso
 */
=======
// 1° EndPoints para listar classificações
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
router.get('/v1/locadora/classificacao', cors(), async (request, response) => {
    let classificacao = await controllerClassificacao.listarClassificacoes();
    response.status(classificacao.status_code).json(classificacao);
});

<<<<<<< HEAD
/**
 * @swagger
 * /v1/locadora/classificacao/{id}:
 *   get:
 *     summary: Busca uma classificação pelo ID
 *     tags: [Classificações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Classificação encontrada
 *       404:
 *         description: Classificação não encontrada
 */
router.get('/v1/locadora/classificacao/:id', cors(), async (request, response) => {
    let id = request.params.id;
=======
// 2° EndPoint: buscar classificação por ID
router.get('/v1/locadora/classificacao/:id', cors(), async (request, response) => {
    let id = request.params.id;
    console.log('[GET] Rota buscarClassificacaoId acessada!');
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
    let classificacao = await controllerClassificacao.buscarClassificacaoPorId(id);
    response.status(classificacao.status_code).json(classificacao);
});

<<<<<<< HEAD
/**
 * @swagger
 * /v1/locadora/classificacao:
 *   post:
 *     summary: Cadastra uma nova classificação indicativa
 *     tags: [Classificações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "12 anos"
 *               descricao:
 *                 type: string
 *                 example: "Não recomendado para menores de 12 anos"
 *     responses:
 *       201:
 *         description: Classificação cadastrada com sucesso
 *       400:
 *         description: Dados inválidos
 */
=======
// 3° EndPoints para inserir nova classificação
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
router.post('/v1/locadora/classificacao', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let classificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType);
    response.status(classificacao.status_code).json(classificacao);
});

<<<<<<< HEAD
/**
 * @swagger
 * /v1/locadora/classificacao/{id}:
 *   put:
 *     summary: Atualiza uma classificação indicativa
 *     tags: [Classificações]
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
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Classificação atualizada com sucesso
 *       404:
 *         description: Classificação não encontrada
 */
=======
// 4° EndPoints para atualizar classificação
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
router.put('/v1/locadora/classificacao/:id', cors(), bodyParserJSON, async (request, response) => {
    let idClassificacao = request.params.id;
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let classificacao = await controllerClassificacao.atualizarClassificacao(dadosBody, idClassificacao, contentType);
    response.status(classificacao.status_code).json(classificacao);
});

<<<<<<< HEAD
/**
 * @swagger
 * /v1/locadora/classificacao/{id}:
 *   delete:
 *     summary: Remove uma classificação indicativa
 *     tags: [Classificações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Classificação excluída com sucesso
 *       404:
 *         description: Classificação não encontrada
 */
=======
// 5° EndPoints para excluir classificação
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
router.delete('/v1/locadora/classificacao/:id', cors(), async (request, response) => {
    let idClassificacao = request.params.id;
    let classificacao = await controllerClassificacao.excluirClassificacao(idClassificacao);
    response.status(classificacao.status_code).json(classificacao);
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
