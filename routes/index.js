var express = require('express');
const {
  homepage,
  productById,
  viewAllProducts,
  productsByCategory,
  twilioTest
} = require('../controllers/indexController.js');
var router = express.Router();

/* GET home page. */
router.get('/', homepage);
router.get('/product/:productId', productById)
router.get('/view-all-products', viewAllProducts)
router.get('/view-all-products?filter=low-to-high', viewAllProducts)
router.get('/view-all-products?filter=high-to-low', viewAllProducts)
router.get('/category/:id', productsByCategory)
router.get('/category/:id?low-to-high', productsByCategory)
router.get('/category/:id?high-to-low', productsByCategory)
router.get('/get-messages', twilioTest)

module.exports = router;