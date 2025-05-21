/**
 * Common Swagger documentation components and schemas
 */

export const commonSchemas = {
  Error: {
    type: 'object',
    properties: {
      message: {
        type: 'string'
      }
    }
  },
  Pagination: {
    type: 'object',
    properties: {
      total: {
        type: 'integer',
        description: 'Total number of items'
      },
      page: {
        type: 'integer',
        description: 'Current page number',
        minimum: 1
      },
      limit: {
        type: 'integer',
        description: 'Number of items per page',
        minimum: 1,
        maximum: 100
      },
      totalPages: {
        type: 'integer',
        description: 'Total number of pages'
      }
    }
  }
};

export const commonResponses = {
  Error400: {
    description: 'Bad Request',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error'
        }
      }
    }
  },
  Error404: {
    description: 'Not Found',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error'
        }
      }
    }
  },
  Error500: {
    description: 'Internal Server Error',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error'
        }
      }
    }
  }
};

export const commonParameters = {
  PaginationQuery: [
    {
      in: 'query',
      name: 'page',
      schema: {
        type: 'integer',
        minimum: 1,
        default: 1
      },
      description: 'Page number'
    },
    {
      in: 'query',
      name: 'limit',
      schema: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 10
      },
      description: 'Number of items per page'
    }
  ]
};

export const commonCommandDetails = {
  Get: {
    method: 'GET',
    authentication: 'Not required',
    rateLimit: '100 requests per minute',
    responseTime: '< 200ms'
  },
  Post: {
    method: 'POST',
    authentication: 'Not required',
    rateLimit: '10 requests per minute',
    responseTime: '< 1s'
  },
  Put: {
    method: 'PUT',
    authentication: 'Required (Admin only)',
    rateLimit: '50 requests per minute',
    responseTime: '< 300ms'
  },
  Delete: {
    method: 'DELETE',
    authentication: 'Required (Admin only)',
    rateLimit: '50 requests per minute',
    responseTime: '< 300ms'
  }
};

export const formatCommandDetails = (details: typeof commonCommandDetails[keyof typeof commonCommandDetails]) => {
  return `
Command Details:
- Method: ${details.method}
- Authentication: ${details.authentication}
- Rate Limit: ${details.rateLimit}
- Response Time: ${details.responseTime}`;
};

export const formatExampleResponse = (example: any) => {
  return `
Example Response:
\`\`\`json
${JSON.stringify(example, null, 2)}
\`\`\``;
};

export const formatExampleRequest = (example: any) => {
  return `
Example Request:
\`\`\`json
${JSON.stringify(example, null, 2)}
\`\`\``;
}; 