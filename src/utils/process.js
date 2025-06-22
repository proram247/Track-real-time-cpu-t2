const cp = require('child_process');

// Get PM2 process ID using pm2 jlist (JSON output)
const getPM2ProcessIdJSON = () => {
    try {
        const pm2List = cp.execSync('pm2 jlist', { encoding: 'utf8' });
        const processes = JSON.parse(pm2List);

        // Find the process with name 'server' or 'server.js'
        const currentProcess = processes.find(process =>
            process.name === 'server' ||
            process.name === 'server.js' ||
            process.pm2_env.name === 'server' ||
            process.pm2_env.name === 'server.js'
        );

        if (currentProcess) {
            return currentProcess.pm_id;
        }

        return 0;
    } catch (error) {
        return 0;
    }
};

module.exports = {
    getPM2ProcessIdJSON
}