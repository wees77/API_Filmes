/***************************************************************************************************** 
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de Filmes
 * Data: 07/10/2025
 * Autor: Weslei Santos
 * Versão: 1.0 (CRUD básico do filme, sem as relações com outras tabelas)
 * Data: 27/10/2025
 * Versão: 1.1 (CRUD do filme com relacionamento com a tabela gênero)
*****************************************************************************************************/

// Import da model do DAO do filme
const filmeDAO = require('../../model/DAO/filme.js')

// Import da controller do filme gênero
const controllerFilmeGenero = require('./controller_filme_genero.js')

// Import do arquivo de mensagens padronizadas
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// 1- Retorna uma lista de todos os filmes
const listarFilmes = async function () {

    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        // Chama a função do DAO que irá retornar todos os filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()

        if (resultFilmes) {
            if (resultFilmes.length > 0) {

                // Processamento para adicionar os gêneros aos filmes
                    for (filme of resultFilmes){
                        let resultGeneros = await controllerFilmeGenero.listarGenerosIdFilme(filme.id)

                        if(resultGeneros.status_code == 200)
                            filme.genero = resultGeneros.items.filmes_generos
                    }

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return DEFAULT_MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500  
    }
}

// 2- Retorna um filme filtrando pelo ID
const buscarFilmeID = async function (id) {

    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        // Validação da chegada do ID
        if (!isNaN(id) && id != "" && id != null && id > 0) {
            // Chama função DAO
            let resultFilmes = await filmeDAO.getSelectByIdMovies(Number(id))
            if (resultFilmes) {
                if (resultFilmes.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes

                    return MESSAGES.DEFAULT_HEADER // 200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400 - referente ao ID
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// 3- Insere um filme
const inserirFilme = async function (filme, contentType) {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição (obrigatório por ser um Json)
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do filme
            let validar = await validarDadosFilme(filme)

            if (!validar) {
                // Chama a função para inserir um novo filme no banco de dados
                let resultFilmes = await filmeDAO.setInsertMovies(filme)

                if (resultFilmes) {
                    // Chama  a função para recebr o ID gerado no BD
                    let lastID = await filmeDAO.getSelectLastId()

                    if (lastID) {

                        // Processar a inserção dos dados na tabela de relação entre filmes e gêneros
                        for (genero of filme.genero) {
                            //filme.genero.forEach(async function(genero){
                            // Cria o Json com o ID do filme e o ID do gênero
                            let filmeGenero = { id_filme: lastID, id_genero: genero.id }

                            // Encaminha o Json com o ID do filme e do genreo para a controller do filme gênero 
                            let resultFilmeGenero = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)

                            if (resultFilmeGenero.status_code != 201) {
                                return MESSAGES.ERROR_RELATIONAL_INSERTION // 500
                            }

                        }

                        // Adiciona o ID no Json com os dados do filme
                        filme.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message

                        // Adicionar no Json dados do gênero
                        // Apaga o atributo gênero apenas com os IDs que foram associados ao filme
                        delete filme.genero

                        // Pesquisa no BD todos os gêneros que foram associados ao filme
                        let resultDadosGenero = await controllerFilmeGenero.listarGenerosIdFilme(lastID)

                        // Cria novamente o atributo gênero e coloca o resultado do BD com os gêneros
                        filme.genero = resultDadosGenero.items.filmes_generos
                        //

                        MESSAGES.DEFAULT_HEADER.items = filme

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }


                    return MESSAGES.DEFAULT_HEADER // 201
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                return validar // 400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415

        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

// 4- Atualiza um filme buscando pelo ID
const atualizarFilme = async function (filme, id, contentType) {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição (obrigatório por ser um Json)
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {


            // Chama a função de validar todos os dados do filme
            let validar = await validarDadosFilme(filme)

            if (!validar) {

                // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o mesmo
                let validarID = await buscarFilmeID(id)

                if (validarID.status_code == 200) {

                    // Adiciona o ID do filme no Json dados para ser encaminhado ao DAO
                    filme.id = Number(id)

                    // Processamento
                    // Chama a função para inserir um novo filme no BD
                    let resultFilmes = await filmeDAO.setUpdateMovies(filme)

                    if (resultFilmes) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.filmes = filme

                        return MESSAGES.DEFAULT_HEADER // 201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função buscar poderá retornar (400, 404 ou 500)
                }

            } else {
                return validar // 400 referente a validação dos dados
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415

        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

// 5 - Exclui um filme buscando pelo ID
const excluirFilme = async function (id) {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação da chegada do ID
        if (!isNaN(id) && id != "" && id != null && id > 0) {

            // Chama função DAO
            let resultFilmes = await filmeDAO.setDeleteMovies(Number(id))

            // Se conseguiu excluir
            if (resultFilmes) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                return MESSAGES.DEFAULT_HEADER // 200 ou 204
            } else {
                // Nenhum filme encontrado com o ID informado
                return MESSAGES.ERROR_NOT_FOUND // 404
            }

        } else {
            // ID inválido
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }

    } catch (error) {
        // Erro interno do controller
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}


// Validação dos dados de cadastro e atualização de um filme
const validarDadosFilme = async function (filme) {

    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    // Validação de todas as entradas de dados
    if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS // 400

    } else if (filme.sinopse == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Sinopse incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS // 400

    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data de lançamento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS // 400

    } else if (filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 8) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Duração incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS // 400

    } else if (filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null || filme.orcamento.length > 12 || typeof (filme.orcamento) != 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Orçamento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS // 400

    } else if (filme.trailer == undefined || filme.nome.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Trailer incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS // 400

    } else if (filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Capa incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS // 400

    } else {
        return false
    }

}


module.exports = {
    listarFilmes,
    buscarFilmeID,
    inserirFilme,
    atualizarFilme,
    excluirFilme,
}