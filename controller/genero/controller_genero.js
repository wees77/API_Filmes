/***************************************************************************************************** 
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de Filmes
 * Data: 22/10/2025
 * Autor: Weslei Santos
 * Versão: 1.0
*****************************************************************************************************/
// Import da model do DAO do genero
const generoDAO = require('../../model/DAO/genero.js')

// Import do arquivo de mensagens padronizadas
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// 1- Retorna uma lista de todos os gêneros
const listarGeneros = async function () {

    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        // Chama a função do DAO que irá retornar todos os filmes do BD
        let resultGeneros = await generoDAO.getSelectAllGeneros()

        if (resultGeneros) {
            if (resultGeneros.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.generos = resultGeneros

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

// 2- Buscar gênero por ID 
const buscarGeneroID = async function (id) {

    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        // Validação da chegada do ID
        if (!isNaN(id) && id != "" && id != null && id > 0) {

            // Cahama a função do DAO que irá buscar o gênero no BD
            let resultGeneros = await generoDAO.getSelectByIdGenero(Number(id))
            if (resultGeneros) {
                if (resultGeneros.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.generos = resultGeneros

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

// 3- Inserir novo gênero
const inserirGenero = async function (genero, contentType) {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição (obrigatório por ser um Json)
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do gênero
            let validar = await validarDadosGenero(genero)

            if (!validar) {
                // Chama a função para inserir um novo genero no banco de dados
                let resultGenero = await generoDAO.setInsertGenero(genero)

                if (resultGenero) {
                    // Chama  a função para recebr o ID gerado no BD
                    let lastID = await generoDAO.getSelectLastId()

                    if (lastID) {
                        // Adiciona o ID no Json com os dados do genero
                        genero.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = genero

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

// 4- Atualizar um gênero existente
const atualizarGenero = async function (genero, id, contentType) {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição (obrigatório por ser um Json)
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {


            // Chama a função de validar todos os dados do genero
            let validar = await validarDadosGenero(genero)

            if (!validar) {

                // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o mesmo
                let validarID = await buscarGeneroID(id)

                if (validarID.status_code == 200) {

                    // Adiciona o ID do genero no Json dados para ser encaminhado ao DAO
                    genero.id = Number(id)

                    // Processamento
                    // Chama a função para inserir um novo genero no BD
                    let resultGenero = await generoDAO.setUpdateGenero(genero)

                    if (resultGenero) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.genero = genero
                        

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

// 5- Deletar um gênero por ID
const excluirGenero = async function (id) {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

     try {
            // Validação da chegada do ID
            if (!isNaN(id) && id != "" && id != null && id > 0) {
                // Chama função DAO
                let resultGenero = await generoDAO.setDeleteGenero(Number(id))
                if (resultGenero) {
                    if (resultGenero.length > 0) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.genero = resultGenero
                        
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

// Validação dos dados de cadastro e atualização de um gênero
const validarDadosGenero = async function (genero) {

    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    // Validação de todas as entradas de dados
    if (genero.nome == '' || genero.nome == undefined || genero.nome == null || genero.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS // 400

    } else {
        return false
    }

}


module.exports = {
    listarGeneros,
    buscarGeneroID,
    inserirGenero,
    validarDadosGenero,
    atualizarGenero,
    excluirGenero

}