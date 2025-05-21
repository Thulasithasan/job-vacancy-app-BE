import { commonCommandDetails, formatCommandDetails, formatExampleRequest, formatExampleResponse } from '@/config/swagger/common.swagger';

const getCommandDetails = (type: keyof typeof commonCommandDetails) => formatCommandDetails(commonCommandDetails[type]);
const getExampleRequest = (example: any) => formatExampleRequest(example);
const getExampleResponse = (example: any) => formatExampleResponse(example);

export const questionSwagger = {
  /**
   * @swagger
   * /api/v1/question/create-question:
   *   post:
   *     summary: Create a new question for job applications
   *     description: |
   *       Creates a new question that can be used in job applications.
   *       ${getCommandDetails('Post')}
   *       
   *       ${getExampleRequest({
   *         jobId: "job123",
   *         question: "Describe your experience with TypeScript",
   *         type: "text",
   *         required: true,
   *         order: 1
   *       })}
   *       
   *       ${getExampleResponse({
   *         status: true,
   *         id: "q123"
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
   *               - jobId
   *               - question
   *               - type
   *             properties:
   *               jobId:
   *                 type: string
   *                 description: ID of the job this question belongs to
   *               question:
   *                 type: string
   *                 description: The question text
   *               type:
   *                 type: string
   *                 enum: [text, multiple-choice, single-choice]
   *                 description: Type of question
   *               required:
   *                 type: boolean
   *                 default: true
   *                 description: Whether the question is mandatory
   *               order:
   *                 type: integer
   *                 minimum: 1
   *                 description: Display order of the question
   *               options:
   *                 type: array
   *                 items:
   *                   type: string
   *                 description: Options for multiple/single choice questions
   *     responses:
   *       201:
   *         description: Question created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: boolean
   *                 id:
   *                   type: string
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized
   */

  /**
   * @swagger
   * /api/v1/question/get-questions/{jobId}:
   *   get:
   *     summary: Get questions for a job
   *     description: |
   *       Retrieves all questions associated with a specific job.
   *       ${getCommandDetails('Get')}
   *       
   *       ${getExampleResponse({
   *         questions: [{
   *           id: "q123",
   *           jobId: "job123",
   *           question: "Describe your experience with TypeScript",
   *           type: "text",
   *           required: true,
   *           order: 1,
   *           createdAt: "2024-03-20T10:00:00Z"
   *         }]
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
   *         description: List of questions
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
   * /api/v1/question/update-question/{id}:
   *   put:
   *     summary: Update a question
   *     description: |
   *       Updates an existing question's details.
   *       ${getCommandDetails('Put')}
   *       
   *       ${getExampleRequest({
   *         question: "Updated question text",
   *         required: false,
   *         order: 2
   *       })}
   *       
   *       ${getExampleResponse({
   *         id: "q123",
   *         question: "Updated question text",
   *         required: false,
   *         order: 2,
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
   *             properties:
   *               question:
   *                 type: string
   *               type:
   *                 type: string
   *                 enum: [text, multiple-choice, single-choice]
   *               required:
   *                 type: boolean
   *               order:
   *                 type: integer
   *                 minimum: 1
   *               options:
   *                 type: array
   *                 items:
   *                   type: string
   *     responses:
   *       200:
   *         description: Question updated successfully
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
   *     summary: Delete a question
   *     description: |
   *       Deletes a question from the system.
   *       ${getCommandDetails('Delete')}
   *       
   *       ${getExampleResponse({
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
   *       404:
   *         $ref: '#/components/responses/Error404'
   */
}; 