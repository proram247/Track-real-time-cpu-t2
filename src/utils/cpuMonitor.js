const os = require('os');
const cp = require('child_process');
const { getPM2ProcessIdJSON } = require('./process');

//CPU threshold for restarting the server on more than 70% usage
const CPU_THRESHOLD = 70
const MONITORING_INTERVAL = 2000;
let restartInProgress = false;

//Restart the server using pm2 and child process with minimum downtime(almost zero)
const restartServer = (processId) => {
    try {
        cp.execSync(`pm2 reload ${processId} --wait-ready --update-env`);
    } catch (error) {
        console.log(`Restart failed: ${error.message}`);
    }
    restartInProgress = false;
};


//Check CPU usage and restart the server if it exceeds the threshold
const checkCPUUsage = async () => {
    try {
        const cpus = os.cpus();
        let totalIdle = 0;
        let totalTick = 0;

        cpus.forEach(cpu => {
            for (type in cpu.times) {
                totalTick += cpu.times[type];
            }
            totalIdle += cpu.times.idle;
        });

        const cpuUsage = 100 - (totalIdle / totalTick * 100);
        console.log("CPU_THRESHOLD:", cpuUsage.toFixed(2) + "%")

        if (cpuUsage > CPU_THRESHOLD && !restartInProgress) {
            restartInProgress = true;
            let processId = getPM2ProcessIdJSON()
            console.log("🚀 ~ checkCPUUsage ~ processId:", processId)
            restartServer(processId);
        }
    } catch (error) {
        restartInProgress = false;
    }
};

//Start the CPU monitoring
const startCPUMonitoring = () => {
    setInterval(checkCPUUsage, MONITORING_INTERVAL);
};

module.exports = {
    startCPUMonitoring
}; 