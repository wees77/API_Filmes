/***************************************************************************************************** 
 * Objetivo: Arquivo responsável pelos padrões de mensagens que o projeto irá realizar,
 *             sempre no formato JSON (Mensagens de erro e sucesso, etc)
 * Data: 07/10/2025
 * Autor: Weslei Santos
 * Versão: 1.0
*****************************************************************************************************/
// Cria um objeto da classe Date para pegar a data atual
const data_atual = new Date()


/********************************* MENSAGENS PADRONIZADAS ******************************************/
const DEFAULT_HEADER = {development: "Weslei Santos", 
                        api_description: "API para manipular dados de Filmes",
                        status: Boolean,
                        status_code: Number,
                        request_date: data_atual.toLocaleString(),
                        items: {}
                    }

/********************************* MENSAGENS DE SUCESSO *******************************************/
const SUCCESS_REQUEST       = {status: true, status_code: 200, message: "Requisição realizada com sucesso!"}
const SUCCESS_CREATED_ITEM  = {status: true, status_code: 201, message: "Item criado com sucesso!"}
const SUCCESS_UPDATE_ITEM   = {status: true, status_code: 200, message: "Item atualizado com sucesso!"}

/********************************* MENSAGENS DE ERRO *********************************************/
const ERROR_NOT_FOUND                    = {status: false, status_code: 404, message: "Nenhum registro encontrado!"}
const ERROR_INTERNAL_SERVER_CONTROLLER   = {status: false, status_code: 500, message: "Impossível processar a requisição, erro interno no controller!"}
const ERROR_INTERNAL_SERVER_MODEL        = {status: false, status_code: 500, message: "Impossível processar a requisição, erro interno no model!"}
const ERROR_REQUIRED_FIELDS              = {status: false, status_code: 400, message: "Impossível completar a requisição, existem campos obrigatórios que não foram preenchidos ou estão inválidos!"}
const ERROR_CONTENT_TYPE                 = {status: false, status_code: 415, message: "Não foi possível completar a requisição, pois o tipo de dado enviado no corpo deve ser Json"}

module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    SUCCESS_UPDATE_ITEM
}