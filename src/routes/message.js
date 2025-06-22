const express = require('express');
const router = express.Router();
const { createMessage } = require('../controllers/message');

/**
 * @swagger
 * /api/message/createMessage:
 *   post:
 *     summary: Create a new message
 *     description: Creates a new message with day and time scheduling
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *               - day
 *               - time
 *             properties:
 *               message:
 *                 type: string
 *                 description: The message content
 *                 example: "Hello World"
 *               day:
 *                 type: string
 *                 enum: [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
 *                 description: Day of the week
 *                 example: "Monday"
 *               time:
 *                 type: string
 *                 pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
 *                 description: Time in HH:MM format (24-hour)
 *                 example: "14:30"
 *     responses:
 *       200:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Bad request - missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/createMessage', createMessage);

module.exports = router; 