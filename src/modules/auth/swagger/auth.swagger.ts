import { commonCommandDetails, formatCommandDetails, formatExampleRequest, formatExampleResponse } from "@/src/config/swagger/common.swagger";

export const authSwagger = {
  /**
   * @swagger
   * /api/v1/auth/login:
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
   *     tags: [Authentication]
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
   * /api/v1/auth/refresh-token:
   *   post:
   *     summary: Refresh authentication token
   *     description: |
   *       Generates a new JWT token using the refresh token.
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleRequest({
   *         refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *       })}
   *       
   *       ${formatExampleResponse({
   *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
   *         refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *       })}
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - refreshToken
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: Token refreshed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 refreshToken:
   *                   type: string
   *       401:
   *         description: Invalid refresh token
   */

  /**
   * @swagger
   * /api/v1/auth/logout:
   *   post:
   *     summary: User logout
   *     description: |
   *       Logs out the user and invalidates the current session.
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleResponse({
   *         status: true,
   *         message: "Logged out successfully"
   *       })}
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Logout successful
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
   */

  /**
   * @swagger
   * /api/v1/auth/password/otp:
   *   post:
   *     summary: Send OTP for password reset
   *     description: |
   *       Sends a one-time password (OTP) to the user's email for password reset.
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleRequest({
   *         email: "john@example.com"
   *       })}
   *       
   *       ${formatExampleResponse({
   *         status: true,
   *         message: "OTP sent successfully"
   *       })}
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *     responses:
   *       200:
   *         description: OTP sent successfully
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
   */

  /**
   * @swagger
   * /api/v1/auth/password/change:
   *   post:
   *     summary: Change password using OTP
   *     description: |
   *       Changes the user's password using the OTP verification.
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleRequest({
   *         email: "john@example.com",
   *         otp: "123456",
   *         newPassword: "newSecurePassword123"
   *       })}
   *       
   *       ${formatExampleResponse({
   *         status: true,
   *         message: "Password changed successfully"
   *       })}
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - otp
   *               - newPassword
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               otp:
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
   */
}; 