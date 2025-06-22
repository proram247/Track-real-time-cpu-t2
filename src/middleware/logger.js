const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Create write stream for log file
const accessLogStream = fs.createWriteStream(
    path.join(logsDir, 'access.log'),
    { flags: 'a' }
);

// Custom token for IP address (using modern properties only)
morgan.token('ip', (req) => {
    return req.ip || req.socket.remoteAddress ||
        req.headers['x-forwarded-for'] || 'unknown';
});

// Custom format for console logging with IP
const consoleFormat = ':ip - :method :url :status :response-time ms';

// Custom format for file logging with IP
const fileFormat = ':ip - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

// Morgan middleware for file logging
const fileLogger = morgan(fileFormat, { stream: accessLogStream });

// Morgan middleware for console logging
const consoleLogger = morgan(consoleFormat);

module.exports = {
    fileLogger,
    consoleLogger
}; 