const moment = require('moment')
const csvToObjects = require('csv2objects')
const fs = require('fs')

const monitor = async(k, callback) => {
    if(k < 0) {
        callback(`${k} Minutes must be a positive value`, undefined)
    }
    else if(fs.existsSync('./log.csv')) {
        const objects = await csvToObjects('./log.csv')
        const arrayObjects = new Array()
        var x;
        if(k.length > 0 && objects.length > k) {
            x = objects.length - k
        }
        else {
            x = 0
        }
        for(let k = x; k < objects.length; k++) {
            const array = new Array()
            var prime = objects[k]
            array.push(prime)
            arrayObjects.push(prime)
        }
        callback(undefined, arrayObjects)
    }
    else {
        callback("Log file does not exist", undefined)
    }
}

module.exports = monitor