const passport = require('passport')
const localPassport = require('passport-local').Strategy
const User = require('../models/user')

// ?TWILIO TEST 

require("dotenv").config();
const accountSid = process.env.twilioAccountSid;
const accountAuthToken = process.env.twilioAccountAuthToken;
const twilio = require("twilio")(accountSid, accountAuthToken);

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

// Customer account creating
passport.use('local-signup', new localPassport({
    usernameField: 'mobile',
    passwordField: 'password',
    passReqToCallback: true
}, (req, mobile, password, done) => {
    User.findOne({ mobile: mobile }, (err, user) => {
        if (err) {
            done(err)
        }
        if (user) {
            return done(null, false, { message: 'Mobile or email is already in use....' })
        }

        const newuser = new User({
            firstname: req.body.fname,
            lastname: req.body.lname,
            mobile: mobile,
            password: password,
            email: req.body.email
        })

        password = password,
            c_password = req.body.c_password
        if (password != c_password) {
            return done(null, false, {
                message: "password and confirm password field should be match"
            })
        }

        newuser.save((err, user) => {
            if (err)
                return done(err)
            else
               console.log(user)
               req.flash('success', 'You are successfully register with us...')
          twilio.messages
          .create({
              body:
                  "Hey Welcome to takeaways, find a great deals and offers from india's famous brands and stay beautiful by using our products... -Team Takeaways Developers",
              from: +12057512561,
              to: +918669026894,
          })
          .then((messages) => console.log("Message sent", messages.sid));
               return done(null, user)
        })
    })
}))

// Login - ADMIN & CUSTOMER
passport.use('local-signin', new localPassport({
    usernameField: 'mobile',
    passwordField: 'password',
    passReqToCallback: true
}, (req, mobile, password, done) => {
     User.findOne({ mobile: mobile }, (err, user) => {
          if (err)
               return done(err)

          if (!user)
               return done(null, false, { message: "No user found with this number" })

          if (user.password != password)
               return done(null, false, { message: "You have entered wrong password" })

          if (req.header == '/admin/dashboard')
               if (user.isAdmin) {
                    return done(null, user)
               } else {
                    return done(null, false, { message: "You are not allowed to login" })
               }
          else
        //   twilio.messages
		// .create({
		// 	body:
		// 		"We noticed that you have loggedin to your takeaways account",
		// 	from: +12057512561,
		// 	to: +918669026894,
		// })
		// .then((messages) => console.log("Message sent", messages.sid));
               return done(null, user)
     })
}))