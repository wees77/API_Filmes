/***************************************************************************************************** 
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de Países
 * Data: 29/10/2025
 * Autor: Weslei Santos
 * Versão: 1.1
*****************************************************************************************************/

// Import da model do DAO do país de origem
const paisOrigemDAO = require('../../model/DAO/pais_origem.js')

// Import do arquivo de mensagens padronizadas
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// Função auxiliar para validar os dados de cadastro e atualização de um país
const validarDadosPais = async function (pais) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (!pais.nome || pais.nome.trim() === '' || pais.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome do País incorreto ou vazio]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

// 1 - Retorna uma lista de todos os países
const listarPais = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultPais = await paisOrigemDAO.getSelectAllPais()

        if (resultPais && Array.isArray(resultPais) && resultPais.length > 0) {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
            MESSAGES.DEFAULT_HEADER.items.pais = resultPais
            
            return MESSAGES.DEFAULT_HEADER
        } else {
            return MESSAGES.ERROR_NOT_FOUND
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
        
    }
}

// 2 - Buscar país por ID 
const buscarPaisID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id > 0) {
            let resultPais = await paisOrigemDAO.getSelectByIdPais(Number(id))

            if (resultPais) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.pais = resultPais
                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// 3 - Inserir novo país
const inserirPais = async function (pais, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {

            let validar = await validarDadosPais(pais)

            if (!validar) {
                let resultPais = await paisOrigemDAO.setInsertPais(pais)

                if (resultPais) {
                    let lastID = await paisOrigemDAO.getSelectLastId()

                    if (lastID) {
                        let novoPais = await paisOrigemDAO.getSelectByIdPais(lastID)
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.pais = novoPais
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
const atualizarPais = async function (pais, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {

            let validarDados = await validarDadosPais(pais)

            if (!validarDados) {
                let validarID = await buscarPaisID(id)

                if (validarID.status_code === MESSAGES.SUCCESS_REQUEST.status_code) {
                    pais.id = Number(id)

                    let resultPais = await paisOrigemDAO.setUpdatePais(pais)

                    if (resultPais) {
                        let paisAtualizado = await paisOrigemDAO.getSelectByIdPais(id)
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.pais = paisAtualizado
                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validarID
                }
            } else {
                return validarDados
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// 5 - Deletar um país por ID 
const excluirPais = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id > 0) {
            let validarID = await buscarPaisID(id)

            if (validarID.status_code === MESSAGES.SUCCESS_REQUEST.status_code) {
                let resultDelete = await paisOrigemDAO.setDeletePais(Number(id))

                if (resultDelete) {
                    MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.delete    = {}

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


module.exports = {
    listarPais,
    buscarPaisID,
    inserirPais,
    atualizarPais,
    excluirPais
}
