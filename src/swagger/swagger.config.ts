import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [
<<<<<<< HEAD
      {
        url: 'http://localhost:3000/',
      },
=======
    //   {
    //     url: 'http://localhost:3000/',
    //   },
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
      {
        url: 'http://3.109.123.217',
        description: 'Production Server'
      },
    ],
  },
  apis: ['src/modules/**/*.ts'], // Your annotated files
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
