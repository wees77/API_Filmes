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

/**
 * @swagger
 * tags:
 *   name: Filmes
 *   description: Endpoints relacionados aos filmes
 */

/**
 * @swagger
 * /v1/locadora/filme:
 *   get:
 *     summary: Lista todos os filmes
 *     tags: [Filmes]
 *     responses:
 *       200:
 *         description: Lista de filmes retornada com sucesso
 */
router.get('/v1/locadora/filme', cors(), async (request, response) => {
    let filme = await controllerFilme.listarFilmes();
    response.status(filme.status_code).json(filme);
});

/**
 * @swagger
 * /v1/locadora/filme/{id}:
 *   get:
 *     summary: Busca um filme pelo ID
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filme encontrado
 *       404:
 *         description: Filme não encontrado
 */
router.get('/v1/locadora/filme/:id', cors(), async (request, response) => {
    let id = request.params.id;
    let filme = await controllerFilme.buscarFilmeID(id);
    response.status(filme.status_code).json(filme);
});

/**
 * @swagger
 * /v1/locadora/filme:
 *   post:
 *     summary: Cadastra um novo filme
 *     tags: [Filmes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Interestelar"
 *               duracao:
 *                 type: string
 *                 example: "2h49min"
 *               data_lancamento:
 *                 type: string
 *                 example: "2014-11-07"
 *               sinopse:
 *                 type: string
 *               id_classificacao:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Filme cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/v1/locadora/filme', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType);
    response.status(filme.status_code).json(filme);
});

/**
 * @swagger
 * /v1/locadora/filme/{id}:
 *   put:
 *     summary: Atualiza um filme
 *     tags: [Filmes]
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
 *               duracao:
 *                 type: string
 *               sinopse:
 *                 type: string
 *               id_classificacao:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso
 *       404:
 *         description: Filme não encontrado
 */
router.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async (request, response) => {
    let idFilme = request.params.id;
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType);
    response.status(filme.status_code).json(filme);
});

/**
 * @swagger
 * /v1/locadora/filme/{id}:
 *   delete:
 *     summary: Remove um filme
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filme excluído com sucesso
 *       404:
 *         description: Filme não encontrado
 */
router.delete('/v1/locadora/filme/:id', cors(), async (request, response) => {
    let idFilme = request.params.id;
    let filme = await controllerFilme.excluirFilme(idFilme);
    response.status(filme.status_code).json(filme);
});

module.exports = router;

