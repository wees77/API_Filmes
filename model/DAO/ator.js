/***************************************************************************************************** 
 * Objetivo: Arquivo responsável pela manipulação de dados de Classificação no Banco de Dados
 * Data: 12/11/2025
 * Autor: Weslei Santos
 * Versão: 1.0
*****************************************************************************************************/

// Import da dependência do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// 1- Retorna uma lista de todos os atores do banco de dados
const getSelectAllActors = async function () {
    try {
        // Script SQL
        let sql = `select * from tbl_ator order by id desc`

        // Encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))

            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// 2 - Retorna um ator pelo ID
const getSelectActorById = async function (id) {
    try {

        // Valida o ID antes da query
        if (!id || isNaN(id)) {
            return false;
        }

        let sql = `SELECT * FROM tbl_ator WHERE id = ${id}`;

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

// 3 - Inserir novo ator
const setInsertActor = async function (ator) {
    try {

        let sql = `INSERT INTO tbl_ator (nome, data_nascimento, descricao, foto)
                   VALUES ('${ator.nome}', '${ator.data_nascimento}', '${ator.descricao}', '${ator.foto}')`;
            
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

// 4 - Atualiza um ator existente
const setUpdateAtor = async function (ator) {
    try {
        let sql = `
            UPDATE tbl_ator
               SET ator             = '${ator.nome}',
                   data_nascimento  = '${ator.data_nascimento}',
                   descricao        = '${ator.descricao}',
                   foto             = '${ator.foto}'
             WHERE id = ${ator.id}`;

        let result = await prisma.$executeRawUnsafe(sql);

        return result ? true : false;
    } catch (error) {
        return false;
    }
};

// 6 - Retorna o último ID inserido
const getSelectLastId = async function () {
    try {
        let sql = `SELECT cast(last_insert_id() as DECIMAL) as id FROM tbl_ator LIMIT 1`;
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
    getSelectAllActors,
    getSelectActorById,
    setInsertActor,
    setUpdateAtor,
    getSelectLastId
}