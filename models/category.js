const mongoose = require('mongoose')
const Schema = mongoose.Schema

// ! Enter category image field 

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        min: 1,
        max: 20,
        trim: true
    },
    description: {
        type: String,
        required: true,
        lowercase: true,
        min: 1
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('category', categorySchema)