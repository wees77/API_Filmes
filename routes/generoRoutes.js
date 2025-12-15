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

<<<<<<< HEAD
/**
 * @swagger
 * tags:
 *   name: Gêneros
 *   description: Endpoints relacionados aos gêneros de filmes
 */

/**
 * @swagger
 * /v1/locadora/genero:
 *   get:
 *     summary: Lista todos os gêneros
 *     tags: [Gêneros]
 *     responses:
 *       200:
 *         description: Lista de gêneros retornada com sucesso
 */
=======
// 1° EndPoints para listar gêneros
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
router.get('/v1/locadora/genero', cors(), async (request, response) => {
    let genero = await controllerGenero.listarGeneros();
    response.status(genero.status_code).json(genero);
});

<<<<<<< HEAD
/**
 * @swagger
 * /v1/locadora/genero/{id}:
 *   get:
 *     summary: Busca um gênero pelo ID
 *     tags: [Gêneros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gênero encontrado
 *       404:
 *         description: Gênero não encontrado
 */
=======
// 2° EndPoints para buscar gênero por ID
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
router.get('/v1/locadora/genero/:id', cors(), async (request, response) => {
    let id = request.params.id;
    let genero = await controllerGenero.buscarGeneroID(id);
    response.status(genero.status_code).json(genero);
});

<<<<<<< HEAD
/**
 * @swagger
 * /v1/locadora/genero:
 *   post:
 *     summary: Cadastra um novo gênero
 *     tags: [Gêneros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Ação"
 *     responses:
 *       201:
 *         description: Gênero cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
=======
// 3° EndPoints para inserir novo gênero
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
router.post('/v1/locadora/genero', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let genero = await controllerGenero.inserirGenero(dadosBody, contentType);
    response.status(genero.status_code).json(genero);
});

<<<<<<< HEAD
/**
 * @swagger
 * /v1/locadora/genero/{id}:
 *   put:
 *     summary: Atualiza um gênero
 *     tags: [Gêneros]
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
 *         description: Gênero atualizado com sucesso
 *       404:
 *         description: Gênero não encontrado
 */
=======
// 4° EndPoints para atualizar gênero
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
router.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async (request, response) => {
    let idGenero = request.params.id;
    let dadosBody = request.body;
    let contentType = request.headers['content-type'];
    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType);
    response.status(genero.status_code).json(genero);
});

<<<<<<< HEAD
/**
 * @swagger
 * /v1/locadora/genero/{id}:
 *   delete:
 *     summary: Remove um gênero
 *     tags: [Gêneros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gênero excluído com sucesso
 *       404:
 *         description: Gênero não encontrado
 */
=======
// 5° EndPoints para excluir gênero
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
router.delete('/v1/locadora/genero/:id', cors(), async (request, response) => {
    let idGenero = request.params.id;
    let genero = await controllerGenero.excluirGenero(idGenero);
    response.status(genero.status_code).json(genero);
<<<<<<< HEAD
});

module.exports = router;
=======
})

module.exports = router;
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
