import { baseSwaggerConfig } from './swagger/base.swagger';
import { jobSwagger } from '../modules/job/swagger/job.swagger';
import { applicationSwagger } from '../modules/application/swagger/application.swagger';
import { userSwagger } from '../modules/user/swagger/user.swagger';
import { questionSwagger } from '../modules/question/swagger/question.swagger';
import { commonSchemas, commonResponses } from './swagger/common.swagger';

// Merge all Swagger configurations
export const swaggerConfig = {
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
  paths: {
    ...jobSwagger,
    ...applicationSwagger,
    ...userSwagger,
    ...questionSwagger
  },
  components: {
    schemas: {
      ...commonSchemas,
      Job: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Job ID'
          },
          title: {
            type: 'string',
            description: 'Job title'
          },
          description: {
            type: 'string',
            description: 'Job description'
          },
          requirements: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Job requirements'
          },
          jobType: {
            type: 'string',
            enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
            description: 'Type of job'
          },
          location: {
            type: 'string',
            description: 'Job location'
          },
          remote: {
            type: 'boolean',
            description: 'Whether the job is remote'
          },
          status: {
            type: 'string',
            enum: ['open', 'closed', 'paused'],
            description: 'Job status'
          },
          salary: {
            type: 'object',
            properties: {
              min: {
                type: 'number',
                description: 'Minimum salary'
              },
              max: {
                type: 'number',
                description: 'Maximum salary'
              },
              currency: {
                type: 'string',
                description: 'Salary currency'
              }
            }
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Job creation date'
          }
        }
      }
    },
    responses: commonResponses,
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
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