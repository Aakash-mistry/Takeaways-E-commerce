const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sliderSchema = new Schema({
     sliderImage:{
          type: String,
          required: true,
     },
     caption:{
          type:String,
          trim: true,
          required: true,
     },
     captionDescription:{
          type:String,
          trim:true
     },
     captionColour:{
          type: String,
          default: 'black'
     },
     animationName:{
          type:String,
          default: 'center-align',
          trim: true
     },
     reDirectionLink:{
          type:String,
          required: true,
          trim: true
     }
},{
     timestamps:true
})

module.exports = mongoose.model('slider', sliderSchema)