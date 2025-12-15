/***************************************************************************************************** 
 * Objetivo: Arquivo responsável pela manipulação de dados de Classificação no Banco de Dados referente ao relacionamento entre filme e gênero
 * Data: 05/11/2025
 * Autor: Weslei Santos
 * Versão: 1.0
*****************************************************************************************************/

// Import da dependência do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// 1- Retorna uma lista de todos os filmes e gêneros do banco de dados
const getSelectAllmoviesGenres = async function () {
    try {
        // Script SQL
        let sql = `select * from tbl_filme_genero order by id desc`

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
const getSelectByIdGenres = async function (id) {
    try {
        // Script SQL
        let sql = `select * from tbl_filme_genero where id = ${id}`

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

// 3- Retorna uma lista de todos os gêneros filtrando pelo ID do filme
const getSelecGenresByIdMovies = async function (id_filme) {
    try {
        // Script SQL
        let sql = `select tbl_genero.id, tbl_genero.nome
                        from tbl_filme 
                            inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                            inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                        where tbl_filme.id = ${id_filme}`

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

// 4- Retorna uma lista de todos os filmes filtrando pelo ID do gêneros
const getSelecMoviesByIdGenres = async function (id_genero) {
    try {
        // Script SQL
        let sql = `select tbl_filme.id, tbl_filme.nome
                        from tbl_filme 
                                inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.id_filme
                                inner join tbl_genero
                                on tbl_genero.id = tbl_filme_genero.id_genero
                        where tbl_genero.id = ${id_genero}`

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
        let sql = `select id from tbl_filme_genero order by id desc limit 1`

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

// 5- Insere um novo genero no banco de dados
const setInsertMoviesGenres = async function (filmeGenero) {
    try {
        let sql = `insert into tbl_filme_genero (id_filme, id_genero)
                values (${filmeGenero.id_filme}, ${filmeGenero.id_genero})`

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

// 6- Altera um gênero no banco de dados
const setUpdateMoviesGenres = async function (filmeGenero) {
    try {
        let sql = `update tbl_filme_genero set 
                        id_filme = ${filmeGenero.id_filme},
                        id_genero = ${filmeGenero.id_genero} 
                    where id = ${filmeGenero.id}`

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

// 7- Deleta um gênero no banco de dados
const setDeleteMoviesGenres = async function (id) {
    try {
        // Script SQL
        let sql = `delete from tbl_filme_genero where id = ${id}`

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
    getSelectAllmoviesGenres,
    getSelectByIdGenres,
    getSelecGenresByIdMovies,
    getSelecMoviesByIdGenres,
    getSelectLastId,
    setInsertMoviesGenres,
    setUpdateMoviesGenres,
    setDeleteMoviesGenres
}