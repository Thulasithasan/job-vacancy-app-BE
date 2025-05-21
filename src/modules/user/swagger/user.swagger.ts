import { commonCommandDetails, formatCommandDetails, formatExampleRequest, formatExampleResponse } from "@/src/config/swagger/common.swagger";

const getCommandDetails = (type: keyof typeof commonCommandDetails) => formatCommandDetails(commonCommandDetails[type]);
const getExampleRequest = (example: any) => formatExampleRequest(example);
const getExampleResponse = (example: any) => formatExampleResponse(example);

export const userSwagger = {
  /**
   * @swagger
   * /api/v1/user/register:
   *   post:
   *     summary: Register a new user
   *     description: |
   *       Creates a new user account with the provided details.
   *       ${getCommandDetails('Post')}
   *       
   *       ${getExampleRequest({
   *         email: "john@example.com",
   *         password: "securePassword123",
   *         firstName: "John",
   *         lastName: "Doe"
   *       })}
   *       
   *       ${getExampleResponse({
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
   * /api/v1/user/login:
   *   post:
   *     summary: User login
   *     description: |
   *       Authenticates a user and returns a JWT token.
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleRequest({
   *         email: "john@example.com",
   *         password: "securePassword123"
   *       })}
   *       
   *       ${formatExampleResponse({
   *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
   *         user: {
   *           id: "user123",
   *           email: "john@example.com",
   *           firstName: "John",
   *           lastName: "Doe",
   *           role: "user"
   *         }
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
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Invalid credentials
   */

  /**
   * @swagger
   * /api/v1/user/get-user/{id}:
   *   get:
   *     summary: Get user by ID
   *     description: |
   *       Retrieves a specific user's details by their ID.
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
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *     responses:
   *       200:
   *         description: User details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       401:
   *         description: Unauthorized
   *       404:
   *         $ref: '#/components/responses/Error404'
   */

  /**
   * @swagger
   * /api/v1/user/update-user/{id}:
   *   put:
   *     summary: Update user details
   *     description: |
   *       Updates the details of an existing user.
   *       ${formatCommandDetails(commonCommandDetails.Put)}
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
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
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
   *         description: User updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized
   *       404:
   *         $ref: '#/components/responses/Error404'
   */

  /**
   * @swagger
   * /api/v1/user/change-password:
   *   put:
   *     summary: Change user password
   *     description: |
   *       Changes the password of the authenticated user.
   *       ${formatCommandDetails(commonCommandDetails.Put)}
   *       
   *       ${formatExampleRequest({
   *         currentPassword: "oldPassword123",
   *         newPassword: "newSecurePassword456"
   *       })}
   *       
   *       ${formatExampleResponse({
   *         status: true,
   *         message: "Password changed successfully"
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
   *               - currentPassword
   *               - newPassword
   *             properties:
   *               currentPassword:
   *                 type: string
   *               newPassword:
   *                 type: string
   *                 minLength: 8
   *     responses:
   *       200:
   *         description: Password changed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: boolean
   *                 message:
   *                   type: string
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized or invalid current password
   */
}; 