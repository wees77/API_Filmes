/***************************************************************************************************** 
 * Objetivo: Arquivo principal da API da locadora de filmes
 * Data: 22/10/2025
 * Autor: Weslei Santos
 * Versão: 2.0
*****************************************************************************************************/

const express = require('express');
const cors = require('cors');
const app = express();

// Configuração do CORS
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();
});

// Importa as rotas
const filmeRoutes = require('./routes/filmeRoutes');
const generoRoutes = require('./routes/generoRoutes');
const paisOrigemRoutes = require('./routes/pais_origemRoutes');
const classificacaoRoutes = require('./routes/classificacaoRoutes');

// Usa as rotas
app.use(filmeRoutes);
app.use(generoRoutes);
app.use(paisOrigemRoutes);
app.use(classificacaoRoutes);

// Define a porta
const PORT = process.env.PORT || 8080;

// Inicializa o servidor
app.listen(PORT, function(){
    console.log('API aguardando Requisições !!!')
})

