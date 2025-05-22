import { commonCommandDetails, formatCommandDetails, formatExampleRequest, formatExampleResponse } from '@/config/swagger/common.swagger';

const getCommandDetails = (type: keyof typeof commonCommandDetails) => formatCommandDetails(commonCommandDetails[type]);
const getExampleRequest = (example: any) => formatExampleRequest(example);
const getExampleResponse = (example: any) => formatExampleResponse(example);

export const jobSwagger = {
  /**
   * @swagger
   * /api/v1/job/create-job:
   *   post:
   *     summary: Create new job
   *     description: |
   *       Creates a new job posting with questions (Admin only).
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleRequest({
   *         title: "Senior Software Engineer",
   *         description: "We are looking for an experienced software engineer...",
   *         requirements: ["5+ years of experience", "Strong knowledge of TypeScript"],
   *         responsibilities: ["Develop new features", "Code review"],
   *         postedDate: "01/03/2024",
   *         applicationDeadline: "31/03/2024",
   *         workLocation: "remote",
   *         jobType: "full-time",
   *         status: "open",
   *         createdBy: "user_id_here",
   *         questions: [
   *           {
   *             questionId: "question_id_1",
   *             questionText: "What is your experience with Node.js?",
   *             answers: [
   *               { answerText: "Beginner" },
   *               { answerText: "Intermediate" },
   *               { answerText: "Expert" }
   *             ]
   *           },
   *           {
   *             questionId: "question_id_2",
   *             questionText: "How many years of experience do you have?",
   *             answers: [
   *               { answerText: "0-2 years" },
   *               { answerText: "3-5 years" },
   *               { answerText: "5+ years" }
   *             ]
   *           }
   *         ]
   *       })}
   *       
   *       ${formatExampleResponse({
   *         id: "job123",
   *         title: "Senior Software Engineer",
   *         description: "We are looking for an experienced software engineer...",
   *         requirements: ["5+ years of experience", "Strong knowledge of TypeScript"],
   *         responsibilities: ["Develop new features", "Code review"],
   *         postedDate: "2024-03-01T00:00:00Z",
   *         applicationDeadline: "2024-03-31T00:00:00Z",
   *         workLocation: "remote",
   *         jobType: "full-time",
   *         status: "open",
   *         createdBy: "user_id_here",
   *         questions: [
   *           {
   *             questionId: "question_id_1",
   *             questionText: "What is your experience with Node.js?",
   *             answers: [
   *               { answerText: "Beginner", createdAt: "2024-03-20T10:00:00Z" },
   *               { answerText: "Intermediate", createdAt: "2024-03-20T10:00:00Z" },
   *               { answerText: "Expert", createdAt: "2024-03-20T10:00:00Z" }
   *             ]
   *           },
   *           {
   *             questionId: "question_id_2",
   *             questionText: "How many years of experience do you have?",
   *             answers: [
   *               { answerText: "0-2 years", createdAt: "2024-03-20T10:00:00Z" },
   *               { answerText: "3-5 years", createdAt: "2024-03-20T10:00:00Z" },
   *               { answerText: "5+ years", createdAt: "2024-03-20T10:00:00Z" }
   *             ]
   *           }
   *         ],
   *         createdAt: "2024-03-20T10:00:00Z",
   *         updatedAt: "2024-03-20T10:00:00Z"
   *       })}
   *     tags: [Jobs]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - description
   *               - requirements
   *               - responsibilities
   *               - postedDate
   *               - applicationDeadline
   *               - workLocation
   *               - jobType
   *               - status
   *               - createdBy
   *               - questions
   *             properties:
   *               title:
   *                 type: string
   *                 maxLength: 100
   *               description:
   *                 type: string
   *                 maxLength: 1000
   *               requirements:
   *                 type: array
   *                 items:
   *                   type: string
   *                 minItems: 1
   *               responsibilities:
   *                 type: array
   *                 items:
   *                   type: string
   *                 minItems: 1
   *               postedDate:
   *                 type: string
   *                 pattern: '^\d{2}/\d{2}/\d{4}$'
   *                 description: Date in DD/MM/YYYY format
   *               applicationDeadline:
   *                 type: string
   *                 pattern: '^\d{2}/\d{2}/\d{4}$'
   *                 description: Date in DD/MM/YYYY format
   *               workLocation:
   *                 type: string
   *                 enum: [remote, onsite, hybrid]
   *                 default: onsite
   *               jobType:
   *                 type: string
   *                 enum: [full-time, part-time, contract, internship, freelance]
   *               status:
   *                 type: string
   *                 enum: [open, closed, paused]
   *                 default: open
   *               createdBy:
   *                 type: string
   *                 description: User ID of the creator
   *               questions:
   *                 type: array
   *                 minItems: 1
   *                 items:
   *                   type: object
   *                   required:
   *                     - questionId
   *                     - questionText
   *                     - answers
   *                   properties:
   *                     questionId:
   *                       type: string
   *                       description: ID of the existing question
   *                     questionText:
   *                       type: string
   *                       maxLength: 200
   *                     answers:
   *                       type: array
   *                       minItems: 1
   *                       items:
   *                         type: object
   *                         required:
   *                           - answerText
   *                         properties:
   *                           answerText:
   *                             type: string
   *                             maxLength: 500
   *     responses:
   *       201:
   *         description: Job created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Job'
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden - Admin access required
   */

  /**
   * @swagger
   * /api/v1/job/get-job/{id}:
   *   get:
   *     summary: Get job by ID
   *     description: |
   *       Retrieves a specific job by its ID.
   *       ${formatCommandDetails(commonCommandDetails.Get)}
   *       
   *       ${formatExampleResponse({
   *         id: "job123",
   *         title: "Senior Software Engineer",
   *         description: "We are looking for an experienced software engineer...",
   *         requirements: ["5+ years of experience", "Strong knowledge of TypeScript"],
   *         responsibilities: ["Develop new features", "Code review"],
   *         postedDate: "2024-03-01T00:00:00Z",
   *         applicationDeadline: "2024-03-31T00:00:00Z",
   *         workLocation: "remote",
   *         jobType: "full-time",
   *         status: "open",
   *         createdBy: "user_id_here",
   *         questions: [
   *           {
   *             questionId: "question_id_1",
   *             questionText: "What is your experience with Node.js?",
   *             answers: [
   *               { answerText: "Beginner", createdAt: "2024-03-20T10:00:00Z" },
   *               { answerText: "Intermediate", createdAt: "2024-03-20T10:00:00Z" },
   *               { answerText: "Expert", createdAt: "2024-03-20T10:00:00Z" }
   *             ]
   *           }
   *         ],
   *         createdAt: "2024-03-20T10:00:00Z",
   *         updatedAt: "2024-03-20T10:00:00Z"
   *       })}
   *     tags: [Jobs]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Job ID
   *     responses:
   *       200:
   *         description: Job details retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Job'
   *       404:
   *         $ref: '#/components/responses/Error404'
   */

  /**
   * @swagger
   * /api/v1/job/get-jobs-with-pagination:
   *   get:
   *     summary: Get all jobs
   *     description: |
   *       Retrieves a list of all active jobs.
   *       ${formatCommandDetails(commonCommandDetails.Get)}
   *       
   *       ${formatExampleResponse({
   *         jobs: [
   *           {
   *             id: "job123",
   *             title: "Senior Software Engineer",
   *             description: "We are looking for an experienced software engineer...",
   *             requirements: ["5+ years of experience", "Strong knowledge of TypeScript"],
   *             responsibilities: ["Develop new features", "Code review"],
   *             postedDate: "2024-03-01T00:00:00Z",
   *             applicationDeadline: "2024-03-31T00:00:00Z",
   *             workLocation: "remote",
   *             jobType: "full-time",
   *             status: "open",
   *             createdBy: "user_id_here",
   *             questions: [
   *               {
   *                 questionId: "question_id_1",
   *                 questionText: "What is your experience with Node.js?",
   *                 answers: [
   *                   { answerText: "Beginner", createdAt: "2024-03-20T10:00:00Z" },
   *                   { answerText: "Intermediate", createdAt: "2024-03-20T10:00:00Z" },
   *                   { answerText: "Expert", createdAt: "2024-03-20T10:00:00Z" }
   *                 ]
   *               }
   *             ],
   *             createdAt: "2024-03-20T10:00:00Z",
   *             updatedAt: "2024-03-20T10:00:00Z"
   *           }
   *         ],
   *         total: 1,
   *         page: 1,
   *         totalPages: 1
   *       })}
   *     tags: [Jobs]
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
   *         name: jobType
   *         schema:
   *           type: string
   *           enum: [full-time, part-time, contract, internship, freelance]
   *         description: Filter by job type
   *       - in: query
   *         name: workLocation
   *         schema:
   *           type: string
   *           enum: [remote, onsite, hybrid]
   *         description: Filter by work location type
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [open, closed, paused]
   *         description: Filter by job status
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *         description: Search in title and description
   *     responses:
   *       200:
   *         description: List of jobs retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 jobs:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Job'
   *                 total:
   *                   type: number
   *                 page:
   *                   type: number
   *                 totalPages:
   *                   type: number
   */

  /**
   * @swagger
   * /api/v1/job/update-job-status/{id}:
   *   put:
   *     summary: Update job status
   *     description: |
   *       Updates the status of an existing job (Admin only).
   *       ${formatCommandDetails(commonCommandDetails.Put)}
   *       
   *       ${formatExampleRequest({
   *         status: "closed"
   *       })}
   *       
   *       ${formatExampleResponse({
   *         id: "job123",
   *         title: "Senior Software Engineer",
   *         status: "closed",
   *         updatedAt: "2024-03-20T11:00:00Z"
   *       })}
   *     tags: [Jobs]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Job ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - status
   *             properties:
   *               status:
   *                 type: string
   *                 enum: [open, closed, paused]
   *     responses:
   *       200:
   *         description: Job status updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Job'
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden - Admin access required
   *       404:
   *         $ref: '#/components/responses/Error404'
   */
};
