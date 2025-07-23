import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/users.router.js'],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
