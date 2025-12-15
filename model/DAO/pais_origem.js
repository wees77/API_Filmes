/***************************************************************************************************** 
 * Objetivo: Arquivo responsável pelas requisições da API da locadora de filmes (CRUD País)
 * Data: 29/10/2025
 * Autor: Weslei Santos
 * Versão: 1.1
*****************************************************************************************************/

// Import da dependência do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

const DEFAULT_MESSAGES = require('../../controller/modulo/config_messages.js')

// 1 - Listar todos os países
const getSelectAllPais = async function () {
    try {
        // Script SQL
        let sql = `select * from tbl_pais_origem order by id desc`

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

// 2 - Buscar país por ID
const getSelectByIdPais = async function (id) {
    try {
        // Script SQL
        let sql = `select * from tbl_pais_origem where id = ${id}`

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

// Retorna o último id inserido no banco de dados
const getSelectLastId = async function () {
    try {
        // Script sql para retornar apenas o último id do BD
        let sql = `select id from tbl_pais_origem order by id desc limit 1`

        // Encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false


    } catch (error) {
        return false
    }
}

// 3 - Inserir novo país
const setInsertPais = async function (pais_origem) {
    try {
        let sql = `insert into tbl_pais_origem (nome)
                values ("${pais_origem.nome}")`
                

        // $executeRawUnsafe() -> Permite executar um script SQL de uma variável e que NÃO retorna valores do BD (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

// 4 - Atualizar país existente
const setUpdatePais = async function (pais_origem) {
    try {
        let sql = `update tbl_pais_origem set 
                        nome                = '${pais_origem.nome}' 
                    where id = ${pais_origem.id}`

        // $executeRawUnsafe() -> Permite executar um script SQL de uma variável e que NÃO retorna valores do BD (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {   
        return false
    }
}

// 5 - Deletar país por ID //
/* const setDeletePais = async function (id) {
    try {
        // Script SQL
        let sql = `delete from tbl_pais_origem where id = ${id}`

        // Encaminha para o BD o script SQL
        let result = await prisma.$executeRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
} */

    // 5 - Deletar país por ID (DAO) — com logs e retorno booleano
const setDeletePais = async function (id) {
    try {
        if (isNaN(id) || id == null) {
            return false
        }

        let sql = `delete from tbl_pais_origem where id = ${Number(id)}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result && Number(result) > 0) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


module.exports = {
    getSelectAllPais,
    getSelectByIdPais,
    setInsertPais,
    setUpdatePais,
    setDeletePais,
    getSelectLastId
}
