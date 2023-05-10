const os = require('node-os-utils')
const moment = require('moment')
const ObjectsToCSV = require('objects-to-csv')
const fs = require('fs')

if(fs.existsSync('./log.csv')) {
    fs.unlinkSync('./log.csv')
}

async function generateLog() {
    const array = new Array()
    var prime = {}

    // CPU Usage
    var cpu = os.cpu
    await cpu.usage().then(cpuPercentage => {
        prime.cpu = cpuPercentage
    })

    // Memory Usage
    var mem = os.mem
    await mem.info().then(info => {
        var memory = ((info.usedMemMb / info.totalMemMb) * 100).toFixed(2)
        prime.memory = memory
    })

    prime.timestamp = moment().format("DD-MM-YYYY HH:mm:ss")
    array.push(prime)

    const csv = new ObjectsToCSV(array);
    if (!fs.existsSync('./log.csv')) {
        await csv.toDisk('./log.csv');
    }
    else {
        await csv.toDisk('./log.csv', { append: true });
    }
}

// Calling Log Generation Function after 1 minutes
generateLog()
setInterval(() => {
    generateLog()
}, 60000);