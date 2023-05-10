const csvToObjects = require('csv2objects')
const fs = require('fs')

const getPrimeNumbers = async (callback) => {
    if(fs.existsSync('./primes.csv')) {
        const primeObjects = await csvToObjects('./primes.csv')
        callback(undefined, primeObjects)
    }
    else {
        callback("File Doesn't Exist", undefined)
    }
}

module.exports = getPrimeNumbers