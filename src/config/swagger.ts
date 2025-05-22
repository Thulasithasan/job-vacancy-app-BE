import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import { userSwagger } from '../modules/user/swagger/user.swagger';
import { authSwagger } from '../modules/auth/swagger/auth.swagger';
import { jobSwagger } from '../modules/job/swagger/job.swagger';
import { applicationSwagger } from '../modules/application/swagger/application.swagger';
import { questionSwagger } from '../modules/question/swagger/question.swagger';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Vacancy API',
      version: '1.0.0',
      description: 'API documentation for the Job Vacancy application'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'Authentication related endpoints'
      },
      {
        name: 'Users',
        description: 'User management endpoints'
      },
      {
        name: 'Jobs',
        description: 'Job management endpoints'
      },
      {
        name: 'Applications',
        description: 'Job application endpoints'
      },
      {
        name: 'Questions',
        description: 'Job questions endpoints'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            email: {
              type: 'string',
              format: 'email'
            },
            firstName: {
              type: 'string'
            },
            lastName: {
              type: 'string'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin']
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
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
      },
      responses: {
        Error400: {
          description: 'Bad Request',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        Error404: {
          description: 'Not Found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      }
    },
    paths: {
      ...userSwagger,
      ...authSwagger,
      ...jobSwagger,
      ...applicationSwagger,
      ...questionSwagger
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