const mongoose = require('mongoose')
const Schema = mongoose.Schema

const displayIds = new Schema({
     productCategoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'category',
          required: true,
     },
     sliderTitle:{
          type:String,
          requied:true
     }
},{
     timestamps: true
})

module.exports = mongoose.model('indexproductfilters', displayIds)