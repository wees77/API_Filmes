/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model para um CRUD de classificacao indicativa
 * Data: 04/11/2025
 * Autor: Weslei Santos
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

// Import da model de classificacao 
const classificacaoDAO = require('../../model/DAO/classificacao.js')

// Import do arquivo de mensagens padronizadas
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// 1 - Retorna uma lista de todas as classificações
const listarClassificacoes = async function () {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let resultClassificacoes = await classificacaoDAO.getSelectAllClassification()

        if (resultClassificacoes) {
            if (resultClassificacoes.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.classificacao = resultClassificacoes

                return MESSAGES.DEFAULT_HEADER
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// 2 - Retorna uma classificação pelo ID
const buscarClassificacaoPorId = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let dadosClassificacao = await classificacaoDAO.getSelectClassificationById(id)

            if (dadosClassificacao && dadosClassificacao.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items = dadosClassificacao
                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        console.log('[buscarClassificacaoPorId] ERRO:', error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// 3 - Inserir nova classificação
const inserirClassificacao = async function (classificacao, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosClassificacao(classificacao)

            if (!validar) {

                let resultClassificacao = await classificacaoDAO.setInsertClassification(classificacao)

                if (resultClassificacao) {

                    let lastId = await classificacaoDAO.getSelectLastId()

                    if (lastId) {

                        classificacao.id_classificacao = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = classificacao

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

// 4 - Atualizar um país existente
const atualizarClassificacao = async function (classificacao, id, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosClassificacao(classificacao)

            if (!validar) {

                let validarId = await buscarClassificacaoId(id)

                if (validarId.status_code == 200) {

                    classificacao.id = Number(id)

                    let resultClassificacao = await classificacaoDAO.setUpdateClassification(classificacao)

                    if (resultClassificacao) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.classificacao = classificacao

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


// 5 - Deletar uma classificação por ID 
const excluirClassificacao = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id > 0) {
            let validarID = await buscarClassificacaoPorId(id)

            if (validarID.status_code === MESSAGES.SUCCESS_REQUEST.status_code) {
                let resultDelete = await classificacaoDAO.setDeleteClassification(Number(id))

                if (resultDelete) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.delete = {}

                    return MESSAGES.DEFAULT_HEADER

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validarID
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função auxiliar para validar os dados de cadastro e atualização de uma classificação
const validarDadosClassificacao = async function (classificacao) {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))


    if (classificacao.classificacao == '' || classificacao.classificacao == null || classificacao.classificacao == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Classificação indicativa incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (classificacao.descricao == '' || classificacao.descricao == null || classificacao.descricao == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Descrição incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (classificacao.simbolo == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Simbolo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarClassificacoes,
    buscarClassificacaoPorId,
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao
}
