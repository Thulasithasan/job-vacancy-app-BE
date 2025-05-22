import { commonCommandDetails, formatCommandDetails, formatExampleRequest, formatExampleResponse } from '@/config/swagger/common.swagger';

const getCommandDetails = (type: keyof typeof commonCommandDetails) => formatCommandDetails(commonCommandDetails[type]);
const getExampleRequest = (example: any) => formatExampleRequest(example);
const getExampleResponse = (example: any) => formatExampleResponse(example);

export const applicationSwagger = {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Application:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *           description: Application ID
   *         jobId:
   *           type: string
   *           description: ID of the job being applied for
   *         firstName:
   *           type: string
   *           description: Applicant's first name
   *         lastName:
   *           type: string
   *           description: Applicant's last name
   *         email:
   *           type: string
   *           format: email
   *           description: Applicant's email address
   *         phoneNumber:
   *           type: string
   *           description: Applicant's phone number
   *         status:
   *           type: string
   *           enum: [pending, reviewed, shortlisted, rejected, accepted]
   *           description: Current status of the application
   *         resume:
   *           type: string
   *           description: Path to the uploaded resume file
   *         resumeSignedUrl:
   *           type: string
   *           description: Signed URL for accessing the resume
   *         coverLetter:
   *           type: string
   *           description: Applicant's cover letter
   *         questionAnswers:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               question:
   *                 type: string
   *               answer:
   *                 type: string
   *         applicationDate:
   *           type: string
   *           format: date-time
   *           description: Date when the application was submitted
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   *     Pagination:
   *       type: object
   *       properties:
   *         total:
   *           type: integer
   *           description: Total number of items
   *         page:
   *           type: integer
   *           description: Current page number
   *         limit:
   *           type: integer
   *           description: Number of items per page
   *         totalPages:
   *           type: integer
   *           description: Total number of pages
   *   responses:
   *     Error400:
   *       description: Bad Request
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               status:
   *                 type: boolean
   *                 example: false
   *               message:
   *                 type: string
   *                 example: Invalid request parameters
   *     Error404:
   *       description: Not Found
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               status:
   *                 type: boolean
   *                 example: false
   *               message:
   *                 type: string
   *                 example: Resource not found
   */

  /**
   * @swagger
   * /api/v1/application/submit-application:
   *   post:
   *     summary: Submit job application
   *     description: |
   *       Submits a new job application.
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleRequest({
   *         jobId: "job123",
   *         firstName: "John",
   *         lastName: "Doe",
   *         email: "john.doe@example.com",
   *         phoneNumber: "+1234567890",
   *         coverLetter: "I am excited to apply for this position...",
   *         questionAnswers: [
   *           {
   *             questionId: "q1",
   *             answer: "My answer to question 1"
   *           }
   *         ]
   *       })}
   *       
   *       ${formatExampleResponse({
   *         id: "app123",
   *         jobId: "job123",
   *         firstName: "John",
   *         lastName: "Doe",
   *         email: "john.doe@example.com",
   *         phoneNumber: "+1234567890",
   *         coverLetter: "I am excited to apply for this position...",
   *         questionAnswers: [
   *           {
   *             questionId: "q1",
   *             answer: "My answer to question 1"
   *           }
   *         ],
   *         status: "pending",
   *         createdAt: "2024-03-20T10:00:00Z",
   *         updatedAt: "2024-03-20T10:00:00Z"
   *       })}
   *     tags: [Applications]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - jobId
   *               - firstName
   *               - lastName
   *               - email
   *               - phoneNumber
   *             properties:
   *               jobId:
   *                 type: string
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *               phoneNumber:
   *                 type: string
   *               coverLetter:
   *                 type: string
   *               questionAnswers:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     questionId:
   *                       type: string
   *                     answer:
   *                       type: string
   *     responses:
   *       201:
   *         description: Application submitted successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Application'
   *       400:
   *         $ref: '#/components/responses/Error400'
   */

  /**
   * @swagger
   * /api/v1/application/get-application/{id}:
   *   get:
   *     summary: Get application by ID
   *     description: |
   *       Retrieves a specific application by its ID.
   *       ${formatCommandDetails(commonCommandDetails.Get)}
   *       
   *       ${formatExampleResponse({
   *         id: "app123",
   *         jobId: "job123",
   *         firstName: "John",
   *         lastName: "Doe",
   *         email: "john.doe@example.com",
   *         phoneNumber: "+1234567890",
   *         coverLetter: "I am excited to apply for this position...",
   *         questionAnswers: [
   *           {
   *             questionId: "q1",
   *             answer: "My answer to question 1"
   *           }
   *         ],
   *         status: "pending",
   *         createdAt: "2024-03-20T10:00:00Z",
   *         updatedAt: "2024-03-20T10:00:00Z"
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
   *         description: Application details retrieved successfully
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
   *         applications: [{
   *           id: "app123",
   *           firstName: "John",
   *           lastName: "Doe",
   *           email: "john@example.com",
   *           status: "pending",
   *           jobId: "job123"
   *         }],
   *         total: 100,
   *         page: 1,
   *         limit: 10,
   *         totalPages: 10
   *       })}
   *     tags: [Applications]
   *     parameters:
   *       - in: query
   *         name: filters[status]
   *         schema:
   *           type: string
   *           enum: [pending, reviewed, shortlisted, rejected, accepted]
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
   *                 applications:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Application'
   *                 total:
   *                   type: integer
   *                 page:
   *                   type: integer
   *                 limit:
   *                   type: integer
   *                 totalPages:
   *                   type: integer
   *       400:
   *         $ref: '#/components/responses/Error400'
   */

  /**
   * @swagger
   * /api/v1/application/update-application-status/{id}:
   *   put:
   *     summary: Update application status
   *     description: |
   *       Updates the status of an application (Admin only).
   *       ${formatCommandDetails(commonCommandDetails.Put)}
   *       
   *       ${formatExampleRequest({
   *         status: "reviewed"
   *       })}
   *       
   *       ${formatExampleResponse({
   *         id: "app123",
   *         status: "reviewed",
   *         updatedAt: "2024-03-20T11:00:00Z"
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
   *         description: Application status updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Application'
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden - Admin access required
   *       404:
   *         $ref: '#/components/responses/Error404'
   */

  /**
   * @swagger
   * /api/v1/application/upload-resume:
   *   post:
   *     summary: Upload resume file
   *     description: |
   *       Uploads a resume file for a job application.
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleResponse({
   *         key: "resume/abc123.pdf",
   *         originalFilename: "resume.pdf",
   *         size: 1024000,
   *         mimeType: "application/pdf"
   *       })}
   *     tags: [Applications]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             required:
   *               - file
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *     responses:
   *       200:
   *         description: Resume uploaded successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 key:
   *                   type: string
   *                 originalFilename:
   *                   type: string
   *                 size:
   *                   type: number
   *                 mimeType:
   *                   type: string
   *       400:
   *         $ref: '#/components/responses/Error400'
   */
}; 