const router = require('express').Router()
const {} = require('../controllers/authController')
const { isLoggedIn } = require('../controllers/userController')
const { checkoutPage, placeingOrders, myOrderRecord } = require("../controllers/orderController")

router.get('/checkout', isLoggedIn, checkoutPage)
router.get('/my-orders', isLoggedIn, myOrderRecord)

// POST :- Placing orders
router.post('/place-this-order', isLoggedIn, placeingOrders)

module.exports = router
