/************************************************************************** 
 * Objetivo: Arquivo responsável pelo CRUD de dados no MYSQL referente ao filme
 * Data: 01/10/2025
 * Autor: Weslei Santos
 * Versão: 1.0
***************************************************************************/
/*
    Exemplos de dependências para conexão com o BD
        * Bancos de Dados relacionais * 
            Sequelize   -> Foi utilizado em muitos projetos desde o inicio do node
            /* Prisma      -> É uma dependência atual que trabalha com BD (MySQL, PostgreSQL e SQL Server) /*
                /* npm install prisma --save              -> Instalar o prisma (Conexão com DataBase) /*
                /* npm install @prisma/client --save      -> Instalar o cliente do prisma (Executar scripts SQL no BD) /*
                /* npx prisma init                        -> Prompt de comando para inicializar o prisma no projeto /*
                /* npx prisma migrate dev                 -> Realiza o sincronismo entre o prisma e o BD, (CUIDADO, pois ele pega e 
                                                                                                        cria as tabelas programadas 
                                                                                                        no ORM schema.prisma) /*
                /* npx prisma generate                    -> Apenas realiza o sincronismo entre o prisma e o BD, geralmente usamos 
                                                            para rodar o projeto em um PC novo /*
            /* Knex        -> É uma dependência atual que trabalha com MySQL /*
        * Banco de Dados não relacionais *
            /* Mongoose      -> É uma dependência para o Mongo DB /*
*/

// Import da dependência do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma');

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient();

// $queryRawUnsafe() ->  Permite executar um script SQL de uma variável e que retorna valores do BD (SELECT)
// $executeRawUnsafe() -> Permite executar um script SQL de uma variável e que NÃO retorna valores do BD (INSERT, UPDATE, DELETE)
// $queryRaw() -> Permite executar um script SQL SEM estar em uma variável e que retorna valores do BD (SELECT) e faz tratamento contra SQL Injection
// $executeRaw() -> Permite executar um script SQL SEM estar em uma variável e que NÃO retorna dados do BD (INSERT, UPDATE, DELETE) e faz tratamento contra SQL Injection 

// Retorna uma lista de todos os filmes do banco de dados
const getSelectAllMovies = async function () {
    try {
        // Script SQL
        let sql = `select * from tbl_filme order by id desc`

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

// Retorna uma lista de filmes filtrando pelo ID
const getSelectByIdMovies = async function (id) {
    try {
        // Script SQL
        let sql = `select * from tbl_filme where id = ${id}`

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
        let sql = `select id from tbl_filme order by id desc limit 1`

        // Encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false

        
    } catch (error) {
        return false
    }
}

// Insere um novo filme no banco de dados
const setInsertMovies = async function (filme) {

    try {
        let sql = `insert into tbl_filme ( nome, 
                        sinopse, 
                        data_lancamento,
                        duracao, 
                        orcamento, 
                        trailer, 
                        capa)
            values ("${filme.nome}",
                    "${filme.sinopse}",
                    "${filme.data_lancamento}",
                    "${filme.duracao}",
                    "${filme.orcamento}",
                    "${filme.trailer}",
                    "${filme.capa}")`

        // $executeRawUnsafe() -> Permite executar um script SQL de uma variável e que NÃO retorna valores do BD (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false    

    } catch (error) {
        return false
    }
}

// Altera um filme no banco de dados
const setUpdateMovies = async function (filme) {

    try {
        let sql = `update tbl_filme set 
                        nome                = '${filme.nome}', 
                        sinopse             = '${filme.sinopse}', 
                        data_lancamento     = '${filme.data_lancamento}',
                        duracao             = '${filme.duracao}', 
                        orcamento           = '${filme.orcamento}', 
                        trailer             = '${filme.trailer}', 
                        capa                = '${filme.capa}'
                    where id = ${filme.id}`
                    

        // $executeRawUnsafe() -> Permite executar um script SQL de uma variável e que NÃO retorna valores do BD (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        
        else
            return false    

    } catch (error) {
        return false
    }
    

}

// Exclui um filme pelo ID
const setDeleteMovies = async function (id) {
    try {
        let sql = `DELETE FROM tbl_filme WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        // result indica quantas linhas foram afetadas
        return result > 0 ? true : false
    } catch (error) {
        return false
    }
}


module.exports = {
    getSelectAllMovies,
    getSelectByIdMovies,
    setInsertMovies,
    setUpdateMovies,
    setDeleteMovies,
    getSelectLastId
}

