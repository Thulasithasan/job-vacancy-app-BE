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
   *       Creates a new job posting (Admin only).
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleRequest({
   *         title: "Senior Software Engineer",
   *         description: "We are looking for an experienced software engineer...",
   *         requirements: ["5+ years of experience", "Strong knowledge of TypeScript"],
   *         location: "Remote",
   *         type: "full-time",
   *         workLocation: "remote",
   *         salary: {
   *           min: 100000,
   *           max: 150000,
   *           currency: "USD"
   *         },
   *         status: "open"
   *       })}
   *       
   *       ${formatExampleResponse({
   *         id: "job123",
   *         title: "Senior Software Engineer",
   *         description: "We are looking for an experienced software engineer...",
   *         requirements: ["5+ years of experience", "Strong knowledge of TypeScript"],
   *         location: "Remote",
   *         type: "full-time",
   *         workLocation: "remote",
   *         salary: {
   *           min: 100000,
   *           max: 150000,
   *           currency: "USD"
   *         },
   *         status: "open",
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
   *               - location
   *               - type
   *               - workLocation
   *             properties:
   *               title:
   *                 type: string
   *               description:
   *                 type: string
   *               requirements:
   *                 type: array
   *                 items:
   *                   type: string
   *               location:
   *                 type: string
   *               type:
   *                 type: string
   *                 enum: [full-time, part-time, contract, internship]
   *               workLocation:
   *                 type: string
   *                 enum: [remote, onsite, hybrid]
   *                 description: Type of work location
   *               salary:
   *                 type: object
   *                 properties:
   *                   min:
   *                     type: number
   *                   max:
   *                     type: number
   *                   currency:
   *                     type: string
   *               status:
   *                 type: string
   *                 enum: [open, closed, paused]
   *                 description: Job status
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
   *         location: "Remote",
   *         type: "full-time",
   *         workLocation: "remote",
   *         salary: {
   *           min: 100000,
   *           max: 150000,
   *           currency: "USD"
   *         },
   *         status: "open",
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
   *             location: "Remote",
   *             type: "full-time",
   *             workLocation: "remote",
   *             status: "open",
   *             createdAt: "2024-03-20T10:00:00Z"
   *           }
   *         ],
   *         total: 1
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
   *         name: type
   *         schema:
   *           type: string
   *           enum: [full-time, part-time, contract, internship]
   *         description: Filter by job type
   *       - in: query
   *         name: workLocation
   *         schema:
   *           type: string
   *           enum: [remote, onsite, hybrid]
   *         description: Filter by work location type
   *       - in: query
   *         name: location
   *         schema:
   *           type: string
   *         description: Filter by job location
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [open, closed, paused]
   *         description: Filter by job status
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
   *                 description: New job status
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
