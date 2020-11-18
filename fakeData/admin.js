const User = require('../models/user')
const mongoose = require('mongoose')

mongoose.connect('mongodb://admin:abc123@ds353338.mlab.com:53338/e-commerce')

const user = new User({
     firstname: "Aakash",
     lastname: "Mistry",
     email: "teamviewer993@gmail.com",
     mobile: '8669026894',
     password: 'abc123'
})


user.save((err, data)=>{
     if(err){
          console.log(err)
     }else{
          console.log(data)
     }
})