import { commonCommandDetails, formatCommandDetails, formatExampleRequest, formatExampleResponse } from "@/src/config/swagger/common.swagger";

export const roleSwagger = {
  /**
   * @swagger
   * /api/v1/role/list:
   *   get:
   *     summary: Get all roles
   *     description: |
   *       Retrieves a list of all roles (Admin only).
   *       ${formatCommandDetails(commonCommandDetails.Get)}
   *       
   *       ${formatExampleResponse({
   *         roles: [
   *           {
   *             id: "role123",
   *             name: "user",
   *             description: "Regular user role",
   *             permissions: ["read"]
   *           }
   *         ],
   *         total: 1
   *       })}
   *     tags: [Roles]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of roles retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 roles:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Role'
   *                 total:
   *                   type: number
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden - Admin access required
   */

  /**
   * @swagger
   * /api/v1/role/{id}:
   *   get:
   *     summary: Get role by ID
   *     description: |
   *       Retrieves a specific role by its ID.
   *       ${formatCommandDetails(commonCommandDetails.Get)}
   *       
   *       ${formatExampleResponse({
   *         id: "role123",
   *         name: "user",
   *         description: "Regular user role",
   *         permissions: ["read"]
   *       })}
   *     tags: [Roles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Role ID
   *     responses:
   *       200:
   *         description: Role details retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Role'
   *       404:
   *         $ref: '#/components/responses/Error404'
   */

  /**
   * @swagger
   * /api/v1/role:
   *   post:
   *     summary: Create new role
   *     description: |
   *       Creates a new role (Admin only).
   *       ${formatCommandDetails(commonCommandDetails.Post)}
   *       
   *       ${formatExampleRequest({
   *         name: "editor",
   *         description: "Content editor role",
   *         permissions: ["read", "write"]
   *       })}
   *       
   *       ${formatExampleResponse({
   *         id: "role123",
   *         name: "editor",
   *         description: "Content editor role",
   *         permissions: ["read", "write"]
   *       })}
   *     tags: [Roles]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - permissions
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               permissions:
   *                 type: array
   *                 items:
   *                   type: string
   *     responses:
   *       201:
   *         description: Role created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Role'
   *       400:
   *         $ref: '#/components/responses/Error400'
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden - Admin access required
   */

  /**
   * @swagger
   * /api/v1/role/{id}:
   *   put:
   *     summary: Update role
   *     description: |
   *       Updates an existing role (Admin only).
   *       ${formatCommandDetails(commonCommandDetails.Put)}
   *       
   *       ${formatExampleRequest({
   *         name: "editor",
   *         description: "Updated content editor role",
   *         permissions: ["read", "write", "delete"]
   *       })}
   *       
   *       ${formatExampleResponse({
   *         id: "role123",
   *         name: "editor",
   *         description: "Updated content editor role",
   *         permissions: ["read", "write", "delete"]
   *       })}
   *     tags: [Roles]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Role ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               permissions:
   *                 type: array
   *                 items:
   *                   type: string
   *     responses:
   *       200:
   *         description: Role updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Role'
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
   * /api/v1/role/{id}:
   *   delete:
   *     summary: Delete role
   *     description: |
   *       Soft deletes a role (Admin only).
   *       ${formatCommandDetails(commonCommandDetails.Delete)}
   *       
   *       ${formatExampleResponse({
   *         status: true,
   *         message: "Role deleted successfully"
   *       })}
   *     tags: [Roles]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Role ID
   *     responses:
   *       200:
   *         description: Role deleted successfully
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
   *       403:
   *         description: Forbidden - Admin access required
   *       404:
   *         $ref: '#/components/responses/Error404'
   */
}; 