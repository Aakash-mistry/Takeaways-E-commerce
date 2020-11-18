const Category = require('../models/category')
const Product = require('../models/product')

exports.categoryPage = (req, res) => {
    res.render('products/categories', {
        user: req.user,
        title: 'Takeaways | All Categories'
    })
}

exports.searchForProduct = (req, res) => {
    var search = req.body.search
    console.log(search)
    Product.find({ $or: [{ title: new RegExp(search) }] }, (err, product) => {
        if (err) {
            console.log(err)
            res.render('error')
        } else {
            console.log('search successfull')
            res.render('admin/dashboard/product/view-product', { productLength: product.length, product })
        }
    }).populate('category', 'name')
}

exports.createListingForm = async(req, res) => {
     const messages = req.flash('success')
     const product = await Product.find().sort({createdAt:1})
     const category = await Category.find()
     // console.log(category)
    res.render('admin/dashboard/product/create-listing', {
        title: 'Takeaways | Create new product',
        user: req.user,
        productLength: product.length,
        categoryLength: category.length,
        category,
        messages
    })
}

exports.createNewProduct = async(req, res) => {
    const product = new Product({
        title: req.body.title,
        category: req.body.category,
        image1: req.body.photo,
        image2: req.body.photo2,
        image3: req.body.photo3,
        imageWidth1: req.body.imageWidthOne,
        imageWidth2: req.body.imageWidthTwo,
        imageWidth3: req.body.imageWidthThree,
        videoLink: req.body.videoLink,
        stock: req.body.stock,
        realPrice: req.body.salePrice,
        fakePrice: req.body.strikePrice,
        productDescription: req.body.description,
        whenToUse: req.body.whenToUse,
        benefit: req.body.benefit,
        howToUse: req.body.howToUse,
        warnings: req.body.warning,
        ingredients: req.body.ingredients,
        status: true
        // brandName:
    })
    product.save((err, product) => {
        if (err) {
            console.log(err)
            res.render('error')
        } else {
          req.flash('success', "product added successfully");
          res.redirect('/admin/view-listing');
        }
    })
}

exports.editProductForm = async(req, res) => {
    const category = await Category.find()
    var product = await Product.findById({ _id: req.params.productId }).populate("category", "name")
    res.render('admin/dashboard/product/edit-product', {
        title: 'Takeaway | Updating ' + product.title,
        product,
        categoryLength: category.length,
        category,
        user: req.user
    })
}

exports.deleteProduct = async(req,res)=>{
     const productId = req.params.id

     await Product.findByIdAndDelete({_id: productId}, (err, product)=>{
          if(err){
               console.log(err)
          }else{
               console.log(product)
               req.flash('success', "Deleted successfully")
               res.redirect('/admin/view-listing')
          }
     })
}

exports.editingProduct = async(req,res)=>{
    const productId = req.params.productId
    await Product.findOneAndUpdate({_id: productId}, {
        $set:{
            title: req.body.title,
            category: req.body.category,
            image1: req.body.image1,
            image2: req.body.image2,
            image3: req.body.image3,
            imageWidth1: req.body.imageWidthOne,
            imageWidth2: req.body.imageWidthTwo,
            imageWidth3: req.body.imageWidthThree,
            videoLink: req.body.videoLink,
            stock: req.body.stock,
            realPrice: req.body.salePrice,
            fakePrice: req.body.strikePrice,
            productDescription: req.body.description,
            whenToUse: req.body.whenToUse,
            benefit: req.body.benefit,
            howToUse: req.body.howToUse,
            warnings: req.body.warning,
            ingredients: req.body.ingredients,
            status:req.body.status
        }
    },(err, data)=>{
        if(err) res.json(err)
        else 
            req.flash('success', "Product details updated successfully")
            res.redirect('/admin/view-listing')
    })
}