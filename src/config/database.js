const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/loadtest', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        process.exit(1);
    }
};

module.exports = connectDatabase; 