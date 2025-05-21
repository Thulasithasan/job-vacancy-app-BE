import { commonCommandDetails, formatCommandDetails, formatExampleRequest, formatExampleResponse } from '@/config/swagger/common.swagger';

const getCommandDetails = (type: keyof typeof commonCommandDetails) => formatCommandDetails(commonCommandDetails[type]);
const getExampleRequest = (example: any) => formatExampleRequest(example);
const getExampleResponse = (example: any) => formatExampleResponse(example);

export const jobSwagger = {
  /**
   * @swagger
   * /api/v1/job/create-job:
   *   post:
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
   *               - jobType
   *               - location
   *             properties:
   *               title:
   *                 type: string
   *               description:
   *                 type: string
   *               requirements:
   *                 type: array
   *                 items:
   *                   type: string
   *               jobType:
   *                 type: string
   *                 enum: [full-time, part-time, contract, internship, freelance]
   *               location:
   *                 type: string
   *               remote:
   *                 type: boolean
   *               salary:
   *                 type: object
   *                 properties:
   *                   min:
   *                     type: number
   *                   max:
   *                     type: number
   *                   currency:
   *                     type: string
   *     responses:
   *       201:
   *         description: Job created successfully
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
   * /api/v1/job/get-job/{id}:
   *   get:
   *     summary: Get job by ID
   *     description: |
   *       Retrieves a specific job posting by its ID.
   *       ${getCommandDetails('Get')}
   *       
   *       ${getExampleResponse({
   *         id: "job123",
   *         title: "Senior Software Engineer",
   *         description: "We are looking for an experienced software engineer...",
   *         requirements: ["5+ years of experience", "Strong knowledge of TypeScript"],
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
   *         description: Job details
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
   *       })}
   *     tags: [Jobs]
   *     parameters:
   *       - in: query
   *         name: filters[status]
   *         schema:
   *           type: string
   *           enum: [open, closed, paused]
   *         description: Filter by job status
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
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Job'
   *                 pagination:
   *                   $ref: '#/components/schemas/Pagination'
   *       400:
   *         $ref: '#/components/responses/Error400'
   */

  /**
   * @swagger
   * /api/v1/job/update-job-status/{id}:
   *   put:
   *     summary: Update job status
   *     description: |
   *       Updates the status of a job posting.
   *       ${getCommandDetails('Put')}
   *       
   *       ${getExampleRequest({
   *         status: "closed"
   *       })}
   *       
   *       ${getExampleResponse({
   *         id: "job123",
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
   *         description: Status updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Job'
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized
   *       404:
   *         $ref: '#/components/responses/Error404'
   */
};
