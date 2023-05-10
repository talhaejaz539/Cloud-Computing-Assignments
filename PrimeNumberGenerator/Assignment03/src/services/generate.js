const ObjectsToCSV = require('objects-to-csv')
const fs = require('fs');

const from = parseInt(process.argv[2])
const to = parseInt(process.argv[3])

if(fs.existsSync('./primes.csv')) {
    fs.unlinkSync('./primes.csv')
}

async function generatePrime(from, to) {
    var file = true
    for(let i = from; i <= to; i++) {
        const array = new Array()
        var primes = {}
        if(isPrime(i)) {
            primes.num = i
            array.push(primes)

            // Writing Generated Prime Number into file
            const csv = new ObjectsToCSV(array)
            if(file)
                await csv.toDisk('./primes.csv')
            else
            await csv.toDisk('./primes.csv', { append: true })
        }
        file = false
    }
}

function isPrime(num) {
    if (num < 2) {
      return false;
    }

    if (num === 2 || num === 3) {
      return true;
    }
  
    if (num % 2 === 0 || num % 3 === 0) {
      return false;
    }
  
    const sqrtNum = Math.floor(Math.sqrt(num));
    for (let i = 5; i <= sqrtNum; i += 2) {
      if (num % i === 0) {
        return false;
      }
    }
  
    return true;
}
  
// Calling Generate Function
generatePrime(from, to)