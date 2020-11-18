const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        min: 1,
        max: 20,
        lowercase: true
    },
    category: {
        type: ObjectId,
        ref: 'category',
    },
    image1: {
        type: String,
        required: true,
    },
    imageWidth1: {
        type: Number,
        default: "250",
    },
    image2: {
        type: String,
    },
    imageWidth2: {
        type: Number,
        default: "250",
    },
    image3: {
        type: String,
    },
    imageWidth3: {
        type: Number,
        default: "250",
    },
    videoLink: {
        type: String,
    },
    stock: {
        type: Number,
        required: true
    },
    realPrice: {
        type: Number,
        reqiured: true
    },
    fakePrice: {
        type: Number
    },
    productDescription: {
        type: String,
        required: true,
        lowercase: true
    },
    whenToUse: {
        type: String,
        lowercase: true
    },
    benefit: {
        type: String,
        lowercase: true
    },
    howToUse: {
        type: String,
        lowercase: true
    },
    warnings: {
        type: String,
        lowercase: true
    },
    ingredients: {
        type: String,
        lowercase: true
    },
    // TODO - Add brand name field in product add forms and in sidenav
    //     brandName: {
    //         type: String,
    //         required: true
    //     },
    status:{
        type:Boolean,
        default: 1
    },
    comments: []
}, {
     timestamps: true
})

module.exports = mongoose.model("product", productSchema)