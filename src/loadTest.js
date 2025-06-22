const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000';
const CONCURRENT_REQUESTS = 10000; // Number of parallel requests
const REQUEST_INTERVAL = 100; // Interval between request batches (ms)
const TEST_DURATION = 60000; // Test duration in milliseconds (1 minute)

// Test data
const testMessages = [
    { message: "Load test message 1", day: "Monday", time: "10:30" },
    { message: "Load test message 2", day: "Tuesday", time: "11:45" },
    { message: "Load test message 3", day: "Wednesday", time: "14:20" },
    { message: "Load test message 4", day: "Thursday", time: "16:15" },
    { message: "Load test message 5", day: "Friday", time: "09:30" },
    { message: "Load test message 6", day: "Saturday", time: "13:45" },
    { message: "Load test message 7", day: "Sunday", time: "15:20" }
];

let requestCount = 0;
let successCount = 0;
let errorCount = 0;
let startTime = Date.now();

// Function to make a single request
const makeRequest = async (requestId) => {
    try {
        const randomMessage = testMessages[Math.floor(Math.random() * testMessages.length)];

        const response = await axios.post(`${BASE_URL}/api/message/createMessage`, randomMessage, {
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        requestCount++;
        successCount++;

        return response;
    } catch (error) {
        requestCount++;
        errorCount++;

        return null;
    }
};

// Function to make concurrent requests
const makeConcurrentRequests = async () => {
    const promises = [];

    for (let i = 0; i < CONCURRENT_REQUESTS; i++) {
        const requestId = requestCount + i + 1;
        promises.push(makeRequest(requestId));
    }

    await Promise.all(promises);
};

// Function to make health check requests (lighter load)
const makeHealthRequests = async () => {
    const promises = [];

    for (let i = 0; i < CONCURRENT_REQUESTS / 2; i++) {
        let requestId = requestCount + i + 1;
        promises.push(
            axios.get(`${BASE_URL}/health`, { timeout: 3000 })
                .then(() => {
                    requestCount++;
                    successCount++;
                })
                .catch((error) => {
                    requestCount++;
                    errorCount++;
                })
        );
    }

    await Promise.all(promises);
};

// Main load test function
const runLoadTest = async () => {
    const interval = setInterval(async () => {
        const elapsed = Date.now() - startTime;

        if (elapsed >= TEST_DURATION) {
            clearInterval(interval);
            process.exit(0);
        }

        // Alternate between heavy and light load
        if (Math.random() > 0.3) {
            await makeConcurrentRequests();
        } else {
            await makeHealthRequests();
        }
    }, REQUEST_INTERVAL);
};

// Handle process termination
process.on('SIGINT', () => {
    process.exit(0);
});

// Check if server is running before starting
const checkServer = async () => {
    try {
        await axios.get(`${BASE_URL}/health`, { timeout: 3000 });
        runLoadTest();
    } catch (error) {
        process.exit(1);
    }
};

// Start the load test
checkServer(); 