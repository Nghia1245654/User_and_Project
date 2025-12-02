import express from 'express';
import { create, getAll, getDetail, update, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Tạo dự án mới
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Tạo dự án thành công
 *       400:
 *         description: Owner không tồn tại hoặc thiếu owner (OWNER_REQUIRED, OWNER_NOT_EXISTS)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: CREATE_PROJECT_FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', create);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Lấy danh sách dự án
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 *       500:
 *         description: GET_PROJECTS_FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', getAll);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Lấy chi tiết dự án
 *     tags: [Project]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của dự án
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy chi tiết thành công
 *       404:
 *         description: PROJECT_NOT_FOUND
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: GET_PROJECT_FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getDetail);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Cập nhật dự án
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của dự án
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Cập nhật dự án thành công
 *       404:
 *         description: PROJECT_NOT_FOUND
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: UPDATE_PROJECT_FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', update);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Xóa dự án
 *     tags: [Project]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của dự án
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa dự án thành công
 *       404:
 *         description: PROJECT_NOT_FOUND
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: DELETE_PROJECT_FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', deleteProject);

export default router;
