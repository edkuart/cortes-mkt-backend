// 📁 backend/swagger.js

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '📘 API Marketplace Modular',
      version: '1.0.0',
      description: 'Documentación de la API del Marketplace Modular',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./routes/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: '📘 API Marketplace Modular',
      customCss: '.swagger-ui .topbar { display: none }'
    })
  );
};

module.exports = { setupSwagger };