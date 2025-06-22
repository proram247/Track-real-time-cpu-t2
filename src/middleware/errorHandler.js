const errorHandler = (err, req, res, next) => {
    // Handle other errors
    res.status(500).json({
        status: 'Error',
        message: err.message || 'Internal server error',
        timestamp: new Date().toISOString()
    });
};

module.exports = errorHandler; 