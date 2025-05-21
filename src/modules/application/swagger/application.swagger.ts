import { commonCommandDetails, formatCommandDetails, formatExampleRequest, formatExampleResponse } from '@/config/swagger/common.swagger';

const getCommandDetails = (type: keyof typeof commonCommandDetails) => formatCommandDetails(commonCommandDetails[type]);
const getExampleRequest = (example: any) => formatExampleRequest(example);
const getExampleResponse = (example: any) => formatExampleResponse(example);

export const applicationSwagger = {
  /**
   * @swagger
   * /api/v1/application/submit-application:
   *   post:
   *     summary: Submit a new job application
   *     description: |
   *       Submits a new job application with applicant details and answers to job-specific questions.
   *       ${getCommandDetails('Post')}
   *       
   *       ${getExampleRequest({
   *         firstName: "John",
   *         lastName: "Doe",
   *         email: "john@example.com",
   *         phone: "+1234567890",
   *         jobId: "job123",
   *         answers: [{
   *           questionId: "q1",
   *           answer: "I have 5 years of experience in web development"
   *         }]
   *       })}
   *       
   *       ${getExampleResponse({
   *         status: true,
   *         id: "app123"
   *       })}
   *     tags: [Applications]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Application'
   *     responses:
   *       201:
   *         description: Application submitted successfully
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
   */

  /**
   * @swagger
   * /api/v1/application/get-application/{id}:
   *   get:
   *     summary: Get application by ID
   *     description: |
   *       Retrieves a specific job application by its ID.
   *       ${getCommandDetails('Get')}
   *       
   *       ${getExampleResponse({
   *         id: "app123",
   *         firstName: "John",
   *         lastName: "Doe",
   *         email: "john@example.com",
   *         phone: "+1234567890",
   *         jobId: "job123",
   *         status: "pending",
   *         answers: [{
   *           questionId: "q1",
   *           answer: "I have 5 years of experience in web development"
   *         }],
   *         createdAt: "2024-03-20T10:00:00Z"
   *       })}
   *     tags: [Applications]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Application ID
   *     responses:
   *       200:
   *         description: Application details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Application'
   *       404:
   *         $ref: '#/components/responses/Error404'
   */

  /**
   * @swagger
   * /api/v1/application/get-application-with-pagination:
   *   get:
   *     summary: Get applications with pagination and filters
   *     description: |
   *       Retrieves a paginated list of job applications with optional filtering.
   *       ${getCommandDetails('Get')}
   *       
   *       Example Request:
   *       ```
   *       GET /api/v1/application/get-application-with-pagination?filters[status]=pending&pagination[page]=1&pagination[limit]=10
   *       ```
   *       
   *       ${getExampleResponse({
   *         data: [{
   *           id: "app123",
   *           firstName: "John",
   *           lastName: "Doe",
   *           email: "john@example.com",
   *           status: "pending",
   *           jobId: "job123"
   *         }],
   *         pagination: {
   *           total: 100,
   *           page: 1,
   *           limit: 10,
   *           totalPages: 10
   *         }
   *       })}
   *     tags: [Applications]
   *     parameters:
   *       - in: query
   *         name: filters[status]
   *         schema:
   *           type: string
   *           enum: [pending, reviewed, shortlisted, rejected]
   *         description: Filter by application status
   *       - in: query
   *         name: filters[search]
   *         schema:
   *           type: string
   *         description: Search in applicant name or email
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
   *         description: List of applications with pagination
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Application'
   *                 pagination:
   *                   $ref: '#/components/schemas/Pagination'
   *       400:
   *         $ref: '#/components/responses/Error400'
   */

  /**
   * @swagger
   * /api/v1/application/update-application-status/{id}:
   *   put:
   *     summary: Update application status
   *     description: |
   *       Updates the status of a job application.
   *       ${getCommandDetails('Put')}
   *       
   *       ${getExampleRequest({
   *         status: "shortlisted"
   *       })}
   *       
   *       ${getExampleResponse({
   *         id: "app123",
   *         status: "shortlisted",
   *         updatedAt: "2024-03-20T10:00:00Z"
   *       })}
   *     tags: [Applications]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Application ID
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
   *                 enum: [pending, reviewed, shortlisted, rejected]
   *     responses:
   *       200:
   *         description: Status updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Application'
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized
   *       404:
   *         $ref: '#/components/responses/Error404'
   */
}; 