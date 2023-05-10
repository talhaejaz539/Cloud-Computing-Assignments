const express = require('express')
const { exec } = require('child_process')
const monitor = require('./services/monitor')
const getPrimeNumbers = require('./services/get')
const fs = require('fs')
const { error } = require('console')
const { stdout, stderr } = require('process')
const app = express()

const port = process.env.PORT || 3000
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Distributed Prime Number Generation')
})

// Generate API
app.get('/generate', (req, res) => {
    const { from, to } = req.query;
    if(from == null || to == null) {
        return res.send({
            error: "From and To must have value."
        })
    }
    else if(parseInt(from) < 0 || parseInt(to) < 0) {
        return res.send({
            error: "Range should be positive."
        })
    }
    else {
        var command = 'node ./src/services/generate.js ' + from +' ' + to
        exec(command, (error, stdout, stderr) => {
            if(error) {
                console.error(`exec error: ${error}`);
                return;
            }
        });
        res.send({
            success: "Prime Number Generation started."
        })
    }
})

// Monitor API
app.get('/monitor', (req, res) => {
    const k = req.query.k  || 5
    monitor(k, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        res.send({
            result: data
        })
    })
})

// Get API
app.get('/get', (req, res) => {
    getPrimeNumbers((error, data) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        res.send({
            result: data
        })
    })
})

app.listen(port, () => {
    exec('node ./src/services/logs.js', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
      });
    if(fs.existsSync('./primes.csv')){
        fs.unlinkSync('./primes.csv')
    }
    console.log(`Server is up on port ${port}`)
})