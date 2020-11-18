const router = require('express').Router()
const { isAdminLoggedIn, createTaglistForm, viewCategory, taglistForm, categoryEditForm, editTaglist, deleteTaglist } = require('../controllers/adminController')

router.get('/create-taglist', isAdminLoggedIn, createTaglistForm)
router.get('/view-taglist', isAdminLoggedIn, viewCategory)
router.get('/category-edit/:categoryId', isAdminLoggedIn, categoryEditForm)

// post category
router.post('/new-taglist', isAdminLoggedIn, taglistForm)
router.post('/edit-taglist/:dataId', isAdminLoggedIn, editTaglist)
router.post('/delete_category/:dataId', isAdminLoggedIn, deleteTaglist)

module.exports = router