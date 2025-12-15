const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Locadora de Filmes',
      version: '2.0',
      description: 'Documentação da API da Locadora de Filmes'
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor local'
      }
    ]
  },
  apis: ['./routes/*.js'] // arquivos de rotas
};

module.exports = swaggerJsdoc(options);

