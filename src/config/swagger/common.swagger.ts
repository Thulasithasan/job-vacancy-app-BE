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
    method: "GET",
    description: "Retrieves data from the server"
  },
  Post: {
    method: "POST",
    description: "Creates new data on the server"
  },
  Put: {
    method: "PUT",
    description: "Updates existing data on the server"
  },
  Delete: {
    method: "DELETE",
    description: "Removes data from the server"
  }
};

export const formatCommandDetails = (details: { method: string; description: string }) => {
  return `${details.method}: ${details.description}`;
};

export const formatExampleRequest = (example: any) => {
  return `Example Request:\n\`\`\`json\n${JSON.stringify(example, null, 2)}\n\`\`\``;
};

export const formatExampleResponse = (example: any) => {
  return `Example Response:\n\`\`\`json\n${JSON.stringify(example, null, 2)}\n\`\`\``;
};

export const commonSwagger = {
  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *         email:
   *           type: string
   *           format: email
   *         firstName:
   *           type: string
   *         lastName:
   *           type: string
   *         role:
   *           type: string
   *           enum: [admin, user]
   *         status:
   *           type: string
   *           enum: [active, inactive]
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   * 
   *     Role:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *         name:
   *           type: string
   *         description:
   *           type: string
   *         permissions:
   *           type: array
   *           items:
   *             type: string
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   * 
   *     Job:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *         title:
   *           type: string
   *         description:
   *           type: string
   *         requirements:
   *           type: array
   *           items:
   *             type: string
   *         location:
   *           type: string
   *         type:
   *           type: string
   *           enum: [full-time, part-time, contract, internship]
   *         salary:
   *           type: object
   *           properties:
   *             min:
   *               type: number
   *             max:
   *               type: number
   *             currency:
   *               type: string
   *         status:
   *           type: string
   *           enum: [active, inactive, draft]
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   * 
   *     Question:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *         text:
   *           type: string
   *         type:
   *           type: string
   *           enum: [text, multiple-choice, single-choice]
   *         required:
   *           type: boolean
   *         order:
   *           type: integer
   *         options:
   *           type: array
   *           items:
   *             type: string
   *         status:
   *           type: string
   *           enum: [active, inactive]
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   * 
   *     Application:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *         jobId:
   *           type: string
   *         firstName:
   *           type: string
   *         lastName:
   *           type: string
   *         email:
   *           type: string
   *           format: email
   *         phoneNumber:
   *           type: string
   *         resume:
   *           type: string
   *         resumeUrl:
   *           type: string
   *         coverLetter:
   *           type: string
   *         questionAnswers:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               questionId:
   *                 type: string
   *               answer:
   *                 type: string
   *         status:
   *           type: string
   *           enum: [pending, reviewed, shortlisted, rejected]
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   * 
   *   responses:
   *     Error400:
   *       description: Bad Request
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               error:
   *                 type: string
   * 
   *     Error401:
   *       description: Unauthorized
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               error:
   *                 type: string
   *                 example: "Unauthorized access"
   * 
   *     Error403:
   *       description: Forbidden
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               error:
   *                 type: string
   *                 example: "Access forbidden"
   * 
   *     Error404:
   *       description: Not Found
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               error:
   *                 type: string
   *                 example: "Resource not found"
   * 
   *     Error500:
   *       description: Internal Server Error
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               error:
   *                 type: string
   *                 example: "Internal server error"
   * 
   *   securitySchemes:
   *     bearerAuth:
   *       type: http
   *       scheme: bearer
   *       bearerFormat: JWT
   */
}; 