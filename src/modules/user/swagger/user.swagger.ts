import { commonCommandDetails, formatCommandDetails, formatExampleRequest, formatExampleResponse } from "@/src/config/swagger/common.swagger";

const getCommandDetails = (type: keyof typeof commonCommandDetails) => formatCommandDetails(commonCommandDetails[type]);
const getExampleRequest = (example: any) => formatExampleRequest(example);
const getExampleResponse = (example: any) => formatExampleResponse(example);

export const userSwagger = {
  /**
   * @swagger
   * /api/v1/user/profile:
   *   get:
   *     summary: Get user profile
   *     description: |
   *       Retrieves the profile of the authenticated user.
   *       ${formatCommandDetails(commonCommandDetails.Get)}
   *       
   *       ${formatExampleResponse({
   *         id: "user123",
   *         email: "john@example.com",
   *         firstName: "John",
   *         lastName: "Doe",
   *         role: "user",
   *         createdAt: "2024-03-20T10:00:00Z"
   *       })}
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User profile retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       401:
   *         description: Unauthorized
   */

  /**
   * @swagger
   * /api/v1/user/list:
   *   get:
   *     summary: Get all users
   *     description: |
   *       Retrieves a list of all users (Admin only).
   *       ${formatCommandDetails(commonCommandDetails.Get)}
   *       
   *       ${formatExampleResponse({
   *         users: [
   *           {
   *             id: "user123",
   *             email: "john@example.com",
   *             firstName: "John",
   *             lastName: "Doe",
   *             role: "user"
   *           }
   *         ],
   *         total: 1
   *       })}
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of users retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 users:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/User'
   *                 total:
   *                   type: number
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden - Admin access required
   */

  /**
   * @swagger
   * /api/v1/user/signup:
   *   post:
   *     summary: Register a new user
   *     description: |
   *       Creates a new user account with the provided details.
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleRequest({
   *         email: "john@example.com",
   *         password: "securePassword123",
   *         firstName: "John",
   *         lastName: "Doe"
   *       })}
   *       
   *       ${formatExampleResponse({
   *         status: true,
   *         id: "user123"
   *       })}
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *               - firstName
   *               - lastName
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 minLength: 8
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *     responses:
   *       201:
   *         description: User registered successfully
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
   * /api/v1/user/update:
   *   post:
   *     summary: Update user profile
   *     description: |
   *       Updates the profile of the authenticated user.
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleRequest({
   *         firstName: "John",
   *         lastName: "Smith",
   *         email: "john.smith@example.com"
   *       })}
   *       
   *       ${formatExampleResponse({
   *         id: "user123",
   *         email: "john.smith@example.com",
   *         firstName: "John",
   *         lastName: "Smith",
   *         updatedAt: "2024-03-20T11:00:00Z"
   *       })}
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *     responses:
   *       200:
   *         description: User profile updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized
   */

  /**
   * @swagger
   * /api/v1/user/update/admin:
   *   post:
   *     summary: Admin update user
   *     description: |
   *       Updates a user's details (Admin only).
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleRequest({
   *         userId: "user123",
   *         firstName: "John",
   *         lastName: "Smith",
   *         email: "john.smith@example.com",
   *         role: "user"
   *       })}
   *       
   *       ${formatExampleResponse({
   *         id: "user123",
   *         email: "john.smith@example.com",
   *         firstName: "John",
   *         lastName: "Smith",
   *         role: "user",
   *         updatedAt: "2024-03-20T11:00:00Z"
   *       })}
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - userId
   *             properties:
   *               userId:
   *                 type: string
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *               role:
   *                 type: string
   *                 enum: [user, admin]
   *     responses:
   *       200:
   *         description: User updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden - Admin access required
   */
}; 