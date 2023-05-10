const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/quadratic', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const quadraticSchema = new mongoose.Schema({
    A: {
        type: String,
        required: true
    },
    B: {
        type: String,
        required: true
    },
    C: {
        type: String,
        required: true
    },
    FirstRoot: {
        type: String,
        required: true
    },
    SecondRoot: {
        type: String,
        required: true
    }
})

const Quadratic = mongoose.model('Quadratic', quadraticSchema)

module.exports = Quadratic