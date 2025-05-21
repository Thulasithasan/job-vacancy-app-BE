import { commonSchemas, commonResponses } from './common.swagger';

export const baseSwaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Job Vacancy API',
    version: '1.0.0',
    description: 'API documentation for the Job Vacancy Application'
  },
  servers: [
    {
      url: 'http://3.109.123.217',
      description: 'Production Server'
    },
    {
      url: 'http://localhost:3000',
      description: 'Local Development Server'
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
      ...commonSchemas,
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
          }
        }
      },
      Job: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          title: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          requirements: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          jobType: {
            type: 'string',
            enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance']
          },
          location: {
            type: 'string'
          },
          remote: {
            type: 'boolean'
          },
          status: {
            type: 'string',
            enum: ['open', 'closed', 'paused']
          },
          salary: {
            type: 'object',
            properties: {
              min: {
                type: 'number'
              },
              max: {
                type: 'number'
              },
              currency: {
                type: 'string'
              }
            }
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      Question: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          jobId: {
            type: 'string'
          },
          question: {
            type: 'string'
          },
          type: {
            type: 'string',
            enum: ['text', 'multiple-choice', 'single-choice']
          },
          required: {
            type: 'boolean'
          },
          order: {
            type: 'integer',
            minimum: 1
          },
          options: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      }
    },
    responses: commonResponses
  },
  tags: [
    {
      name: 'Jobs',
      description: 'Job posting management endpoints'
    },
    {
      name: 'Applications',
      description: 'Job application management endpoints'
    },
    {
      name: 'Users',
      description: 'User management endpoints'
    },
    {
      name: 'Questions',
      description: 'Job application questions management endpoints'
    }
  ]
}; 