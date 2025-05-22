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
   *       Creates a new question for job applications (Admin only).
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleRequest({
   *         text: "What is your experience with TypeScript?",
   *         type: "text",
   *         required: true,
   *         order: 1,
   *         status: "active"
   *       })}
   *       
   *       ${formatExampleResponse({
   *         id: "q1",
   *         text: "What is your experience with TypeScript?",
   *         type: "text",
   *         required: true,
   *         order: 1,
   *         status: "active",
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
   *               - text
   *               - type
   *               - required
   *               - order
   *             properties:
   *               text:
   *                 type: string
   *               type:
   *                 type: string
   *                 enum: [text, multiple-choice, single-choice]
   *               required:
   *                 type: boolean
   *               order:
   *                 type: integer
   *               options:
   *                 type: array
   *                 items:
   *                   type: string
   *               status:
   *                 type: string
   *                 enum: [active, inactive]
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
   *       403:
   *         description: Forbidden - Admin access required
   */

  /**
   * @swagger
   * /api/v1/question/get-questions/{jobId}:
   *   get:
   *     summary: Get questions by job ID
   *     description: |
   *       Retrieves all questions for a specific job.
   *       ${formatCommandDetails(commonCommandDetails.Get)}
   *       
   *       ${formatExampleResponse({
   *         questions: [
   *           {
   *             id: "q1",
   *             text: "What is your experience with TypeScript?",
   *             type: "text",
   *             required: true,
   *             order: 1,
   *             status: "active"
   *           }
   *         ]
   *       })}
   *     tags: [Questions]
   *     parameters:
   *       - in: path
   *         name: jobId
   *         required: true
   *         schema:
   *           type: string
   *         description: Job ID
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
   *       404:
   *         $ref: '#/components/responses/Error404'
   */

  /**
   * @swagger
   * /api/v1/question/add-answer/{questionId}:
   *   put:
   *     summary: Add answer to question
   *     description: |
   *       Adds an answer to a specific question.
   *       ${formatCommandDetails(commonCommandDetails.Put)}
   *       
   *       ${formatExampleRequest({
   *         answer: "I have 5 years of experience with TypeScript"
   *       })}
   *       
   *       ${formatExampleResponse({
   *         id: "q1",
   *         text: "What is your experience with TypeScript?",
   *         type: "text",
   *         required: true,
   *         order: 1,
   *         status: "active",
   *         answer: "I have 5 years of experience with TypeScript",
   *         updatedAt: "2024-03-20T11:00:00Z"
   *       })}
   *     tags: [Questions]
   *     parameters:
   *       - in: path
   *         name: questionId
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
   *               - answer
   *             properties:
   *               answer:
   *                 type: string
   *     responses:
   *       200:
   *         description: Answer added successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Question'
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       404:
   *         $ref: '#/components/responses/Error404'
   */

  /**
   * @swagger
   * /api/v1/question/delete-question/{id}:
   *   delete:
   *     summary: Delete question
   *     description: |
   *       Soft deletes a question (Admin only).
   *       ${formatCommandDetails(commonCommandDetails.Delete)}
   *       
   *       ${formatExampleResponse({
   *         status: true,
   *         message: "Question deleted successfully"
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
   *     responses:
   *       200:
   *         description: Question deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: boolean
   *                 message:
   *                   type: string
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden - Admin access required
   *       404:
   *         $ref: '#/components/responses/Error404'
   */
}; 