const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const Quadratic = require('./schema')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setting Handlebars and Views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setting Static Directory Path
app.use(express.static(publicDirPath))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// Index Route
app.get('', (req, res) => {
    res.render('index', {
        name: 'Talha Ejaz'
    })
})

// API for quadratic formula
app.get('/quadraticSolve', async (req, res) => {

    var a = req.query.a
    var b = req.query.b
    var c = req.query.c

    let d = (b * b) - (4 * a * c)
    if(d > 0) {
        firstRoot = (-b + Math.sqrt(d)) / (2 * a)
        secondRoot = (-b - Math.sqrt(d)) / (2 * a)
    }
    else if(d == 0) {
        firstRoot = secondRoot = -b / (2 * a)
    }
    else {
        let real = (-b / (2 * a)).toFixed(2)
        let imaginary = (Math.sqrt(-d) / (2 * a)).toFixed(2)
        firstRoot = real + " + " + imaginary + "i"
        secondRoot = real + " - " + imaginary + "i"
    }
    var newData = new Quadratic({
        A: a,
        B: b,
        C: c,
        FirstRoot: firstRoot,
        SecondRoot: secondRoot
    })
    try {
        await newData.save()
        res.status(201).send(newData)
    } catch(e) {
        res.status(500).send({ "error": "An error has occured!" })
    }

})

// API to fetch all records
app.get('/readAll', async (req, res) => {
    console.log('APi hit')
    try {

        // Not working
        // Quadratic.find({}, (error, data) => {
        //     if(error) {
        //         res.status(500).send({ "error": "An error has occured while connecting to Database!" })
        //     } else {
        //         res.send(data)
        //     }
        // })

        // For Postman
        const solutions = await Quadratic.find();
        res.json(solutions)
    } catch(e) {
        res.status(500).send({ "error": "An error has occured!" })
    }

})

// Server Up
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})