/***************************************************************************************************** 
 * Objetivo: Arquivo responsável pela manipulação de dados de Classificação no Banco de Dados
 * Data: 07/10/2025
 * Autor: Weslei Santos
 * Versão: 1.0
*****************************************************************************************************/

// Import da dependência do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

const DEFAULT_MESSAGES = require('../../controller/modulo/config_messages.js')

// 1 - Retorna todas as classificações
const getSelectAllClassification = async function () {
    try {
        let sql = `SELECT * FROM tbl_classificacao ORDER BY id DESC`;
        let result = await prisma.$queryRawUnsafe(sql);

        return result;
    } catch (error) {
        return false;
    }
};


// 2 - Retorna uma classificação pelo ID
const getSelectClassificationById = async function (id) {
    try {

        // Valida o ID antes da query
        if (!id || isNaN(id)) {
            return false;
        }

        let sql = `SELECT * FROM tbl_classificacao WHERE id = ${id}`;

        let result = await prisma.$queryRawUnsafe(sql);

        if (result && result.length > 0) {
            return result;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};


// 3 - Inserir nova classificação
const setInsertClassification = async function (classificacao) {
    try {

        let sql = `INSERT INTO tbl_classificacao (classificacao, descricao, simbolo)
                   VALUES ('${classificacao.classificacao}', '${classificacao.descricao}', '${classificacao.simbolo}')`;

        let result = await prisma.$executeRawUnsafe(sql);

        // Prisma retorna o número de linhas afetadas (1 = sucesso)
        if (result && result > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};


// 4 - Atualiza uma classificação existente
const setUpdateClassification = async function (classificacao) {
    try {
        let sql = `
            UPDATE tbl_classificacao
               SET classificacao = '${classificacao.classificacao}',
                   descricao     = '${classificacao.descricao}',
                   simbolo       = '${classificacao.simbolo}'
             WHERE id = ${classificacao.id}
        `;

        let result = await prisma.$executeRawUnsafe(sql);

        return result ? true : false;
    } catch (error) {
        return false;
    }
};

// 5 - Exclui uma classificação
const setDeleteClassification = async function (id) {
    try {
        if (isNaN(id) || id == null) {
            return false
        }
        
        let sql = `delete from tbl_classificacao where id = ${Number(id)}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result && Number(result) > 0) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false

    }
};

// 6 - Retorna o último ID inserido
const getSelectLastId = async function () {
    try {
        let sql = `SELECT cast(last_insert_id() as DECIMAL) as id FROM tbl_classificacao LIMIT 1`;
        let result = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0)
            return result[0].id;
        else
            return false;
    } catch (error) {
        return false;
    }
};

module.exports = {
    getSelectAllClassification,
    getSelectClassificationById,
    setInsertClassification,
    setUpdateClassification,
    setDeleteClassification,
    getSelectLastId
};
