const express = require('express')
const axios = require('axios')
const ObjectsToCSV = require('objects-to-csv')
const fs = require('fs')
const app = express()

const port = process.env.PORT || 8000
app.use(express.json())

if(fs.existsSync('./log.csv')) {
    fs.unlinkSync('./log.csv')
}
if(fs.existsSync('./primes.csv')) {
    fs.unlinkSync('./primes.csv')
}

app.get('/', (req, res) => {
    res.send(`Master Service is up on port ${port}.`)
})

// Call To Monitor Service
monitorService()
setInterval(() => {
    monitorService()
}, 1*60*1000)

async function monitorService() {
    try {
        const response = await axios.get('http://127.0.0.1:9001/monitor', {
            params: {
                k: 5
            }
        })
        var prime = {}
        prime.timestamp = response.data.result[0].timestamp
        prime.cpu = response.data.result[0].cpu
        prime.memory = response.data.result[0].memory

        const csv = new ObjectsToCSV([prime])
        csv.toDisk('./log.csv', {append: true})
    } catch(e) {
        console.log(e)
    }
}

// Calls To Generate Functions
axiosCalls()

async function axiosCalls() {
    try {
        const response1 = await axios.get('http://127.0.0.1:9001/generate', {
            params: {
                from: 1,
                to: 10000
            }
        })
        console.log(response1.data)
        const response2 = await axios.get('http://127.0.0.1:9002/generate', {
            params: {
                from: 10001,
                to: 100000000
            }
        })
        console.log(response2.data)
        const response3 = await axios.get('http://127.0.0.1:9003/generate', {
            params: {
                from: 100000001,
                to: 1000000000000
            }
        })
        console.log(response3.data)
    } catch(e) {
        console.log(e)
    }
}

var isSave = false
primesSaving()
setInterval(() => {
    if(isSave) {
        console.log('Prime Numbers are already save')
    } else {
        primesSaving()
    }
}, 2*60*1000)

async function primesSaving() {
    isSave = true
    if(fs.existsSync('./primes.csv')) {
        fs.unlinkSync('./primes.csv')
    }
    for(let i = 9001; i <= 9003; i++) {
        try {
            const response = await axios.get(`http://127.0.0.1:${i}/get`)
            var size = Object.keys(response.data.result).length;
            const array = new Array()
            for(let j = 0; j < size; j++) {
                var prime = {}
                prime.num = response.data.result[j].num
                array.push(prime)
                const csv = new ObjectsToCSV([prime])
                await csv.toDisk('./primes.csv', { append: true })
            }
        } catch(e) {
            console.log(e)
        }
    }
    isSave = false
}

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})