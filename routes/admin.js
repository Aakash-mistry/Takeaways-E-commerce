const { adminLoginPage, dashbaord, isAdminLoggedIn, notAdminLoggedIn, adminLogout, viewProducts, userIndexPage, sliderForm, sliderSaveBackend, deleteSliderImage, editSliderForm, editSliderBackend, createProductSlider,createproductSliderBackend, viewAllOrders, viewOrderDetails, adminProfile, deletingOrderManually } = require('../controllers/adminController')
const { webAdminLogin } = require('../controllers/authController')
const { searchForProduct, createListingForm, createNewProduct, editProductForm, deleteProduct, editingProduct } = require('../controllers/productController')

const router = require('express').Router()

// get routes
router.get('/login', notAdminLoggedIn, adminLoginPage)
router.get('/dashboard', isAdminLoggedIn, dashbaord)
router.get('/view-users-homepage', isAdminLoggedIn, userIndexPage)
router.get('/logout', isAdminLoggedIn, adminLogout)
router.get('/admin-profile', isAdminLoggedIn, adminProfile)

// PRODUCTS
router.get('/view-listing', isAdminLoggedIn, viewProducts)
router.get('/create-listing', isAdminLoggedIn, createListingForm)
router.get('/edit/product/:productId', isAdminLoggedIn, editProductForm)

// GET - SLIDER
router.get('/create-carousel', isAdminLoggedIn, sliderForm)
router.get('/edit/slider/:id', isAdminLoggedIn, editSliderForm)

// GET - PRODUCT SLIDER
router.get('/create-product-slider', isAdminLoggedIn, createProductSlider)

// post routes
router.post('/login', notAdminLoggedIn, webAdminLogin)
router.post('/admin-search', isAdminLoggedIn, searchForProduct)

// PRODUCTS
router.post('/create-listing', isAdminLoggedIn, createNewProduct)
router.post('/delete/product/:id', isAdminLoggedIn, deleteProduct)
router.post('/edit/product/:productId', isAdminLoggedIn, editingProduct)

// POST - SLIDER
router.post('/create-new-slider', isAdminLoggedIn, sliderSaveBackend)
router.post('/delete/slider/:id', isAdminLoggedIn, deleteSliderImage)
router.post('/editing/slider/:id', isAdminLoggedIn, editSliderBackend)

// POST - PRODUCT SLIDER
router.post('/create-product-slider', isAdminLoggedIn, createproductSliderBackend)

// ORDERS - PRODUCT ORDER ROUTES // !GET
router.get('/view-all-orders', isAdminLoggedIn, viewAllOrders)
router.get('/view-order-details/:id', isAdminLoggedIn, viewOrderDetails)

// ORDERS - PRODUCT ORDER ROUTES // ! POST
router.post('/delete/delete-this-orders/:id', isAdminLoggedIn, deletingOrderManually)

module.exports = router