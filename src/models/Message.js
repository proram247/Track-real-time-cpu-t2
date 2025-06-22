const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true,
        enum: {
            values: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            message: 'Day must be a valid day name (Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday)'
        }
    },
    time: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
            },
            message: 'Time must be in HH:MM format (24-hour)'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema); 