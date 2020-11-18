const { addToCart, myShoppingCart, reduceByOne, insertProductByOne } = require('../controllers/cartController')

const router = require('express').Router()

router.get('/add-to-cart/:id', addToCart)
router.get('/remove-from-cart/:id', reduceByOne)
router.get('/add-by-one-cart/:id', insertProductByOne)
router.get('/clear-session', (req,res)=>{
     req.session.destroy()
     res.send('done')
})
router.get('/my-cart', myShoppingCart)

module.exports = router