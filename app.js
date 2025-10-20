/***************************************************************************************************** 
 * Objetivo: Arquivo responsável pelas requisições da API da locadora de filmes
 * Data: 07/10/2025
 * Autor: Weslei Santos
 * Versão: 1.0
*****************************************************************************************************/
// Import das dependências da API
const express = require('express');          // Responsável pela API
const cors = require('cors');               // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser'); // Responsável por gerenciar a chegada dos dados da API com Front-End

// Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json(); 

// Cria o objeto app para criar a API
const app = express()

// Porta
const PORT = process.PORT || 8080

// Configurações do cors
app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin','*')
    response.header('Acces-Control-Allow-methods','GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

// Import das controllers
const controllerFilme = require('./controller/filme/controller_filme')

// 1° EndPoints para a rota de Filme
app.get('/v1/locadora/Filme', cors(), async function(request, response){

    // Chama a função para listar os filmes do BD
    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code)
    response.json(filme)
})

// 2° EndPoints para a rota de Filme filtrando pelo ID
app.get('/v1/locadora/Filme/:id', cors(), async function(request, response){

    // Recebe o ID do filme
    let id = request.params.id

    // Chama a função para buscar o filme filtrando pelo ID
    let filme = await controllerFilme.buscarFilmeID(id)
    response.status(filme.status_code).json(filme)
})

// 3° EndPoints para a rota de Filme (Inserir um novo filme)
app.post('/v1/locadora/Filme', cors(),bodyParserJSON, async function(request, response){

    // Recebe os dados do body do corpo da requisição (Se utilizar o bodyParser, é obrigatório ter no EndPoint)
    let dadosBody = request.body

    // Recebe o tipo de dado da requisição (Json ou XML ou ...)
    let contentType = request.headers['content-type']

    // Chama a função do controller para inserir um novo filme, encaminha os dados e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code).json(filme)

})

// 4° EndPoints para a rota de Filme (Atualizar um filme)
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function (request, response){
    // Recebe o ID do filme
    let idFilme = request.params.id
    
    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o tipo de dado da requisição (Json ou XML)
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o filme e encaminha os dados,  o id e o content-type
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)
   
    response.status(filme.status_code).json(filme)
})

// 5° EndPoints para a rota de Filme (Excluir um filme)
app.put('/v1/locadora/filme/:id', cors(), async function (request, response){
    // Recebe o ID do filme
    let idFilme = request.params.id

    // Chama a função do controller para excluir um filme
    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code).json(filme)
})

app.listen(PORT, function(){
    console.log('API aguardadndo Requisições !!!')
})

