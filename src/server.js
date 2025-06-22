const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const connectDatabase = require('./config/database');
const { startCPUMonitoring } = require('./utils/cpuMonitor');
const { fileLogger, consoleLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 3000;

// Morgan middleware for logging
app.use(fileLogger); // Log to file
app.use(consoleLogger); // Log to console

// Middleware
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Server Load Test API Documentation'
}));

// Connect to database
connectDatabase();

// Start CPU monitoring
startCPUMonitoring();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns server health status, uptime, and system information
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Health'
 *       500:
 *         description: Server is unhealthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        pid: process.pid,
        memory: process.memoryUsage()
    });
});

// Routes
app.use('/api/message', require('./routes/message'));

// Error middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    // Server started silently
}); 
