/***************************************************************************************************** 
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de atores
 * Data: 12/11/2025
 * Autor: Weslei Santos
 * Versão: 1.0
*****************************************************************************************************/

// Import da model do DAO do 
const atorDAO = require('../../model/DAO/ator.js')

// Import da controller do filme gênero
const controllerFilmeGenero = require('./controller_ator.js')

// Import do arquivo de mensagens padronizadas
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// 1 - Retorna uma lista de todos os atores
const listarAtores = async function () {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let resultAtores = await atorDAO.getSelectAllActors()

        if (resultAtores) {
            if (resultAtores.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.ator = resultAtores

                return MESSAGES.DEFAULT_HEADER
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// 2 - Retorna um ator pelo ID
const buscarAtorPorId = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let dadosAtor = await atorDAO.getSelectActorById(id)

            if (dadosAtor && dadosAtor.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items = dadosAtor
                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// 3 - Inserir novo ator
const inserirAtor = async function (ator, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosAtor(ator)

            if (!validar) {

                let resultAtor = await atorDAO.setInsertActor(ator)

                if (resultAtor) {

                    let lastId = await atorDAO.getSelectLastId()

                    if (lastId) {

                        ator.id = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = ator

                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

// 4 - Atualizar um ator existente
const atualizarAtor = async function (ator, id, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosAtor(ator)

            if (!validar) {

                let validarId = await buscarAtorId(id)

                if (validarId.status_code == 200) {

                    ator.id = Number(id)

                    let resultAtor = await atorDAO.setInsertActor(ator)

                    if (resultAtor) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.ator = ator

                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validarId
                }
            } else {
                return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função auxiliar para validar os dados de cadastro e atualização de um ator
const validarDadosAtor = async function (ator) {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))


    if (ator.nome == '' || ator.nome == null || ator.nome == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (ator.descricao == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Descrição incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (ator.data_nascimento == '' || ator.data_nascimento == null || ator.data_nascimento == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de nascimento incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (ator.foto == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Foto incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}


module.exports = {
    listarAtores,
    buscarAtorPorId,
    inserirAtor,
    atualizarAtor,
    validarDadosAtor
}