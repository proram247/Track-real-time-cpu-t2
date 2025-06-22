const Message = require('../models/Message');

const createMessage = async (req, res, next) => {
    try {
        const { message, day, time } = req.body;

        if (!message || !day || !time) {
            return res.status(400).json({
                error: 'message, day, and time are required'
            });
        }

        // Save message to database
        const newMessage = new Message({
            message,
            day,
            time
        });
        let savedMessage = await newMessage.save();
        res.json({ success: true, message: 'Message created successfully', data: savedMessage });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createMessage
}; 