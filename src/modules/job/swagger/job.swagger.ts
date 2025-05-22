import { commonCommandDetails, formatCommandDetails, formatExampleRequest, formatExampleResponse } from '@/config/swagger/common.swagger';

const getCommandDetails = (type: keyof typeof commonCommandDetails) => formatCommandDetails(commonCommandDetails[type]);
const getExampleRequest = (example: any) => formatExampleRequest(example);
const getExampleResponse = (example: any) => formatExampleResponse(example);

export const jobSwagger = {
  /**
   * @swagger
   * /api/v1/job/create-job:
   *   post:
<<<<<<< HEAD
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
=======
   *     summary: Create a new job posting
   *     description: |
   *       Creates a new job posting with the provided details.
   *       ${getCommandDetails('Post')}
   *       
   *       ${getExampleRequest({
   *         title: "Senior Software Engineer",
   *         description: "We are looking for an experienced software engineer...",
   *         requirements: ["5+ years of experience", "Strong knowledge of TypeScript"],
   *         jobType: "full-time",
   *         location: "New York, NY",
   *         remote: true,
   *         salary: {
   *           min: 120000,
   *           max: 150000,
   *           currency: "USD"
   *         }
   *       })}
   *       
   *       ${getExampleResponse({
   *         status: true,
   *         id: "job123"
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
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
<<<<<<< HEAD
   *               - requirements
   *               - location
   *               - type
   *               - workLocation
=======
   *               - jobType
   *               - location
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
   *             properties:
   *               title:
   *                 type: string
   *               description:
   *                 type: string
   *               requirements:
   *                 type: array
   *                 items:
   *                   type: string
<<<<<<< HEAD
   *               location:
   *                 type: string
   *               type:
   *                 type: string
   *                 enum: [full-time, part-time, contract, internship]
   *               workLocation:
   *                 type: string
   *                 enum: [remote, onsite, hybrid]
   *                 description: Type of work location
=======
   *               jobType:
   *                 type: string
   *                 enum: [full-time, part-time, contract, internship, freelance]
   *               location:
   *                 type: string
   *               remote:
   *                 type: boolean
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
   *               salary:
   *                 type: object
   *                 properties:
   *                   min:
   *                     type: number
   *                   max:
   *                     type: number
   *                   currency:
   *                     type: string
<<<<<<< HEAD
   *               status:
   *                 type: string
   *                 enum: [open, closed, paused]
   *                 description: Job status
=======
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
   *     responses:
   *       201:
   *         description: Job created successfully
   *         content:
   *           application/json:
   *             schema:
<<<<<<< HEAD
   *               $ref: '#/components/schemas/Job'
=======
   *               type: object
   *               properties:
   *                 status:
   *                   type: boolean
   *                 id:
   *                   type: string
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized
<<<<<<< HEAD
   *       403:
   *         description: Forbidden - Admin access required
=======
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
   */

  /**
   * @swagger
   * /api/v1/job/get-job/{id}:
   *   get:
   *     summary: Get job by ID
   *     description: |
<<<<<<< HEAD
   *       Retrieves a specific job by its ID.
   *       ${formatCommandDetails(commonCommandDetails.Get)}
   *       
   *       ${formatExampleResponse({
=======
   *       Retrieves a specific job posting by its ID.
   *       ${getCommandDetails('Get')}
   *       
   *       ${getExampleResponse({
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
   *         id: "job123",
   *         title: "Senior Software Engineer",
   *         description: "We are looking for an experienced software engineer...",
   *         requirements: ["5+ years of experience", "Strong knowledge of TypeScript"],
<<<<<<< HEAD
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
=======
   *         jobType: "full-time",
   *         location: "New York, NY",
   *         remote: true,
   *         status: "open",
   *         salary: {
   *           min: 120000,
   *           max: 150000,
   *           currency: "USD"
   *         },
   *         createdAt: "2024-03-20T10:00:00Z"
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
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
<<<<<<< HEAD
   *         description: Job details retrieved successfully
=======
   *         description: Job details
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
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
<<<<<<< HEAD
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
=======
   *     summary: Get jobs with pagination and filters
   *     description: |
   *       Retrieves a paginated list of job postings with optional filtering.
   *       ${getCommandDetails('Get')}
   *       
   *       Example Request:
   *       ```
   *       GET /api/v1/job/get-jobs-with-pagination?filters[status]=open&filters[jobType]=full-time&pagination[page]=1&pagination[limit]=10
   *       ```
   *       
   *       ${getExampleResponse({
   *         data: [{
   *           id: "job123",
   *           title: "Senior Software Engineer",
   *           jobType: "full-time",
   *           location: "New York, NY",
   *           remote: true,
   *           status: "open"
   *         }],
   *         pagination: {
   *           total: 100,
   *           page: 1,
   *           limit: 10,
   *           totalPages: 10
   *         }
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
   *       })}
   *     tags: [Jobs]
   *     parameters:
   *       - in: query
<<<<<<< HEAD
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
=======
   *         name: filters[status]
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
   *         schema:
   *           type: string
   *           enum: [open, closed, paused]
   *         description: Filter by job status
<<<<<<< HEAD
   *     responses:
   *       200:
   *         description: List of jobs retrieved successfully
=======
   *       - in: query
   *         name: filters[jobType]
   *         schema:
   *           type: string
   *           enum: [full-time, part-time, contract, internship, freelance]
   *         description: Filter by job type
   *       - in: query
   *         name: filters[remote]
   *         schema:
   *           type: boolean
   *         description: Filter by remote availability
   *       - in: query
   *         name: filters[search]
   *         schema:
   *           type: string
   *         description: Search in job title or description
   *       - in: query
   *         name: pagination[page]
   *         schema:
   *           type: integer
   *           minimum: 1
   *           default: 1
   *         description: Page number
   *       - in: query
   *         name: pagination[limit]
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *           default: 10
   *         description: Number of items per page
   *     responses:
   *       200:
   *         description: List of jobs with pagination
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
<<<<<<< HEAD
   *                 jobs:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Job'
   *                 total:
   *                   type: number
=======
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Job'
   *                 pagination:
   *                   $ref: '#/components/schemas/Pagination'
   *       400:
   *         $ref: '#/components/responses/Error400'
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
   */

  /**
   * @swagger
   * /api/v1/job/update-job-status/{id}:
   *   put:
   *     summary: Update job status
   *     description: |
<<<<<<< HEAD
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
=======
   *       Updates the status of a job posting.
   *       ${getCommandDetails('Put')}
   *       
   *       ${getExampleRequest({
   *         status: "closed"
   *       })}
   *       
   *       ${getExampleResponse({
   *         id: "job123",
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
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
<<<<<<< HEAD
   *                 description: New job status
   *     responses:
   *       200:
   *         description: Job status updated successfully
=======
   *     responses:
   *       200:
   *         description: Status updated successfully
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Job'
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized
<<<<<<< HEAD
   *       403:
   *         description: Forbidden - Admin access required
=======
>>>>>>> 1d3b753f8957cef9c51f4eab57fffacf12dff3f5
   *       404:
   *         $ref: '#/components/responses/Error404'
   */
};
