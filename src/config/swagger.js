const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Server Load Test API',
            version: '1.0.0',
            description: 'API documentation for Server Load Test application with CPU monitoring and zero-downtime restarts',
            contact: {
                name: 'API Support',
                email: 'support@example.com'
            },
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                Message: {
                    type: 'object',
                    required: ['message', 'day', 'time'],
                    properties: {
                        message: {
                            type: 'string',
                            description: 'The message content',
                            example: 'Hello World'
                        },
                        day: {
                            type: 'string',
                            enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                            description: 'Day of the week',
                            example: 'Monday'
                        },
                        time: {
                            type: 'string',
                            pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$',
                            description: 'Time in HH:MM format (24-hour)',
                            example: '14:30'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when the message was created'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when the message was last updated'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Error message'
                        }
                    }
                },
                Success: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            description: 'Success message'
                        },
                        data: {
                            $ref: '#/components/schemas/Message'
                        }
                    }
                },
                Health: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'OK'
                        },
                        uptime: {
                            type: 'number',
                            description: 'Server uptime in seconds',
                            example: 123.456
                        },
                        timestamp: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Current server timestamp'
                        },
                        pid: {
                            type: 'number',
                            description: 'Process ID',
                            example: 12345
                        },
                        memory: {
                            type: 'object',
                            properties: {
                                rss: {
                                    type: 'number',
                                    description: 'Resident Set Size in bytes'
                                },
                                heapTotal: {
                                    type: 'number',
                                    description: 'Total heap size in bytes'
                                },
                                heapUsed: {
                                    type: 'number',
                                    description: 'Used heap size in bytes'
                                },
                                external: {
                                    type: 'number',
                                    description: 'External memory in bytes'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js', './src/server.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs; 