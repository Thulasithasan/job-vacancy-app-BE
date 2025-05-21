import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Application API',
      version: '1.0.0',
      description: 'API documentation for the Job Application system',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Application: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'phone', 'jobId'],
          properties: {
            firstName: {
              type: 'string',
              description: 'Applicant\'s first name'
            },
            lastName: {
              type: 'string',
              description: 'Applicant\'s last name'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Applicant\'s email address'
            },
            phone: {
              type: 'string',
              description: 'Applicant\'s phone number'
            },
            jobId: {
              type: 'string',
              description: 'ID of the job being applied for'
            },
            answers: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  questionId: {
                    type: 'string'
                  },
                  answer: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  apis: ['./src/modules/**/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Application) => {
  // Swagger page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Swagger docs available at http://localhost:3000/api-docs`);
}; 