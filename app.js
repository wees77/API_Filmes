/***************************************************************************************************** 
 * Objetivo: Arquivo principal da API da locadora de filmes
 * Data: 22/10/2025
 * Autor: Weslei Santos
 * Versão: 2.0
*****************************************************************************************************/
<<<<<<< HEAD
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();

// Middleware JSON
app.use(express.json());

=======

const express = require('express');
const cors = require('cors');
const app = express();

>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
// Configuração do CORS
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();
});

<<<<<<< HEAD
// Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

=======
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175
// Importa as rotas
const filmeRoutes = require('./routes/filmeRoutes');
const generoRoutes = require('./routes/generoRoutes');
const paisOrigemRoutes = require('./routes/pais_origemRoutes');
const classificacaoRoutes = require('./routes/classificacaoRoutes');
const atorRoutes = require('./routes/atorRoutes');  

// Usa as rotas
app.use(filmeRoutes);
app.use(generoRoutes);
app.use(paisOrigemRoutes);
app.use(classificacaoRoutes);
app.use(atorRoutes);

<<<<<<< HEAD
// Porta
const PORT = process.env.PORT || 8080;

// Inicializa o servidor
app.listen(PORT, () => {
    console.log('API aguardando requisições...');
    console.log(`Swagger disponível em http://localhost:${PORT}/swagger`);
});

=======
// Define a porta
const PORT = process.env.PORT || 8080;

// Inicializa o servidor
app.listen(PORT, function(){
    console.log('API aguardando Requisições !!!')
})
>>>>>>> 1857e8ed580f77809b0ec6f41a3a69922e4c2175

