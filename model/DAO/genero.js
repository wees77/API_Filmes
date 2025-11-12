/***************************************************************************************************** 
 * Objetivo: Arquivo responsável pelas requisições da API da locadora de filmes
 * Data: 22/10/2025
 * Autor: Weslei Santos
 * Versão: 1.0
*****************************************************************************************************/

// Import da dependência do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// 1- Retorna uma lista de todos os generos do banco de dados
const getSelectAllGeneros = async function () {
    try {
        // Script SQL
        let sql = `select * from tbl_genero order by id desc`

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

// 2- Retorna uma lista de todos os gêneros filtrando pelo ID
const getSelectByIdGenero = async function (id) {
    try {
        // Script SQL
        let sql = `select * from tbl_genero where id = ${id}`

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
        let sql = `select id from tbl_genero order by id desc limit 1`

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

// 3- Insere um novo genero no banco de dados
const setInsertGenero = async function (genero) {
    try {
        let sql = `insert into tbl_genero (nome)
                values ("${genero.nome}")`


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

// 4- Altera um gênero no banco de dados
const setUpdateGenero = async function (genero) {
    try {
        let sql = `update tbl_genero set 
                            nome                = '${genero.nome}' 
                        where id = ${genero.id}`

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

// 5- Deleta um gênero no banco de dados
const setDeleteGenero = async function (id) {
    try {
        // Script SQL
        let sql = `delete from tbl_genero where id = ${id}`

        // Encaminha para o BD o script SQL
        let result = await prisma.$executeRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }

}


module.exports = {
    getSelectAllGeneros,
    getSelectByIdGenero,
    setInsertGenero,
    getSelectLastId,
    setUpdateGenero,
    setDeleteGenero
}