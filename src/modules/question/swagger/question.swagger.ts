import { commonCommandDetails, formatCommandDetails, formatExampleRequest, formatExampleResponse } from '@/config/swagger/common.swagger';

const getCommandDetails = (type: keyof typeof commonCommandDetails) => formatCommandDetails(commonCommandDetails[type]);
const getExampleRequest = (example: any) => formatExampleRequest(example);
const getExampleResponse = (example: any) => formatExampleResponse(example);

export const questionSwagger = {
  /**
   * @swagger
   * /api/v1/question/create-question:
   *   post:
   *     summary: Create new question
   *     description: |
   *       Creates a new question that can be used in job applications.
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleRequest({
   *         questionText: "What is your experience with Node.js?",
   *         answers: [
   *           { answerText: "Beginner" },
   *           { answerText: "Intermediate" },
   *           { answerText: "Expert" }
   *         ]
   *       })}
   *       
   *       ${formatExampleResponse({
   *         id: "question123",
   *         questionText: "What is your experience with Node.js?",
   *         answers: [
   *           { answerText: "Beginner", createdAt: "2024-03-20T10:00:00Z" },
   *           { answerText: "Intermediate", createdAt: "2024-03-20T10:00:00Z" },
   *           { answerText: "Expert", createdAt: "2024-03-20T10:00:00Z" }
   *         ],
   *         createdAt: "2024-03-20T10:00:00Z",
   *         updatedAt: "2024-03-20T10:00:00Z"
   *       })}
   *     tags: [Questions]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - questionText
   *               - answers
   *             properties:
   *               questionText:
   *                 type: string
   *                 maxLength: 200
   *                 description: The question text
   *               answers:
   *                 type: array
   *                 minItems: 1
   *                 items:
   *                   type: object
   *                   required:
   *                     - answerText
   *                   properties:
   *                     answerText:
   *                       type: string
   *                       maxLength: 500
   *                       description: The answer text
   *     responses:
   *       201:
   *         description: Question created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Question'
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized
   */

  /**
   * @swagger
   * /api/v1/question/get-questions:
   *   get:
   *     summary: Get questions with pagination
   *     description: |
   *       Retrieves a paginated list of questions with optional filtering.
   *       ${formatCommandDetails(commonCommandDetails.Get)}
   *       
   *       ${formatExampleResponse({
   *         questions: [
   *           {
   *             id: "question123",
   *             questionText: "What is your experience with Node.js?",
   *             answers: [
   *               { answerText: "Beginner", createdAt: "2024-03-20T10:00:00Z" },
   *               { answerText: "Intermediate", createdAt: "2024-03-20T10:00:00Z" },
   *               { answerText: "Expert", createdAt: "2024-03-20T10:00:00Z" }
   *             ],
   *             createdAt: "2024-03-20T10:00:00Z",
   *             updatedAt: "2024-03-20T10:00:00Z"
   *           }
   *         ],
   *         total: 1,
   *         page: 1,
   *         totalPages: 1
   *       })}
   *     tags: [Questions]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *         description: Page number
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *         description: Number of items per page
   *       - in: query
   *         name: jobId
   *         schema:
   *           type: string
   *         description: Filter questions by job ID
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *         description: Search in question text
   *     responses:
   *       200:
   *         description: Questions retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 questions:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Question'
   *                 total:
   *                   type: number
   *                 page:
   *                   type: number
   *                 totalPages:
   *                   type: number
   */

  /**
   * @swagger
   * /api/v1/question/get-question/{id}:
   *   get:
   *     summary: Get question by ID
   *     description: |
   *       Retrieves a specific question by its ID.
   *       ${formatCommandDetails(commonCommandDetails.Get)}
   *       
   *       ${formatExampleResponse({
   *         id: "question123",
   *         questionText: "What is your experience with Node.js?",
   *         answers: [
   *           { answerText: "Beginner", createdAt: "2024-03-20T10:00:00Z" },
   *           { answerText: "Intermediate", createdAt: "2024-03-20T10:00:00Z" },
   *           { answerText: "Expert", createdAt: "2024-03-20T10:00:00Z" }
   *         ],
   *         createdAt: "2024-03-20T10:00:00Z",
   *         updatedAt: "2024-03-20T10:00:00Z"
   *       })}
   *     tags: [Questions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Question ID
   *     responses:
   *       200:
   *         description: Question details retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Question'
   *       404:
   *         $ref: '#/components/responses/Error404'
   */

  /**
   * @swagger
   * /api/v1/question/add-answer/{id}:
   *   post:
   *     summary: Add answer to question
   *     description: |
   *       Adds a new answer to an existing question.
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleRequest({
   *         answerText: "Advanced"
   *       })}
   *       
   *       ${formatExampleResponse({
   *         id: "question123",
   *         questionText: "What is your experience with Node.js?",
   *         answers: [
   *           { answerText: "Beginner", createdAt: "2024-03-20T10:00:00Z" },
   *           { answerText: "Intermediate", createdAt: "2024-03-20T10:00:00Z" },
   *           { answerText: "Expert", createdAt: "2024-03-20T10:00:00Z" },
   *           { answerText: "Advanced", createdAt: "2024-03-20T11:00:00Z" }
   *         ],
   *         createdAt: "2024-03-20T10:00:00Z",
   *         updatedAt: "2024-03-20T11:00:00Z"
   *       })}
   *     tags: [Questions]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Question ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - answerText
   *             properties:
   *               answerText:
   *                 type: string
   *                 maxLength: 500
   *                 description: The answer text
   *     responses:
   *       200:
   *         description: Answer added successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Question'
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized
   *       404:
   *         $ref: '#/components/responses/Error404'
   */

  /**
   * @swagger
   * /api/v1/question/delete-question/{id}:
   *   delete:
   *     summary: Delete question
   *     description: |
   *       Soft deletes a question by setting isDeleted flag.
   *       ${formatCommandDetails(commonCommandDetails.Delete)}
   *     tags: [Questions]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Question ID
   *     responses:
   *       200:
   *         description: Question deleted successfully
   *       401:
   *         description: Unauthorized
   *       404:
   *         $ref: '#/components/responses/Error404'
   */
}; 