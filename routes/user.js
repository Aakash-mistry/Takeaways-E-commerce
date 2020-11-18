const { passportCreateNewAccount, logoutUser, passportCustomerLogin } = require('../controllers/authController')
const { loginPage, registerPage, logout, myProfilePage, isLoggedIn, notLoggedIn } = require('../controllers/userController')
const router = require('express').Router()

router.get('/login', notLoggedIn, loginPage)

router.get('/register', notLoggedIn, registerPage)

router.get('/my-profile/', isLoggedIn, myProfilePage)

router.get('/logout', isLoggedIn,logoutUser)

router.post('/create-new-account', passportCreateNewAccount)

router.post('/customer-login', passportCustomerLogin)

module.exports = router