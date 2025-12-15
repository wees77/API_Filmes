/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de classificação indicativa de filmes
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
router.get('/v1/locadora/classificacao', cors(), async (request, response) => {
    let classificacao = await controllerClassificacao.listarClassificacoes();
    response.status(classificacao.status_code).json(classificacao);
});

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
    let classificacao = await controllerClassificacao.buscarClassificacaoPorId(id);
    response.status(classificacao.status_code).json(classificacao);
});

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
router.post('/v1/locadora/classificacao', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let classificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType);
    response.status(classificacao.status_code).json(classificacao);
});

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
router.put('/v1/locadora/classificacao/:id', cors(), bodyParserJSON, async (request, response) => {
    let idClassificacao = request.params.id;
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let classificacao = await controllerClassificacao.atualizarClassificacao(dadosBody, idClassificacao, contentType);
    response.status(classificacao.status_code).json(classificacao);
});

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
router.delete('/v1/locadora/classificacao/:id', cors(), async (request, response) => {
    let idClassificacao = request.params.id;
    let classificacao = await controllerClassificacao.excluirClassificacao(idClassificacao);
    response.status(classificacao.status_code).json(classificacao);
});

module.exports = router;
