const Cart = require('../models/cart')
const Product = require('../models/product')

exports.addToCart = async(req,res)=>{
   var productId = req.params.id
   var cart = new Cart(req.session.cart ? req.session.cart : {})
   await Product.findById(productId, (err, product)=>{
        if(err){
          console.log(err)
        }
        cart.add(product, product._id, product.title)
        req.session.cart = cart
     //    res.flash("success", "Product Added")
        res.redirect('/my-cart')
     })
}

exports.reduceByOne = (req,res)=>{
     const productId = req.params.id;
     var cart = new Cart(req.session.cart ? req.session.cart : {})

     cart.reduceByOne(productId)
     req.session.cart = cart
     res.redirect('/my-cart')
}

exports.insertProductByOne = (req,res)=>{
     const productId = req.params.id;
     const cart = new Cart(req.session.cart ? req.session.cart : {});

     cart.addByOne(productId);
     req.session.cart = cart;
     res.redirect('/my-cart')
}

exports.myShoppingCart = (req,res)=>{
   if (!req.session.cart) {
     return res.render("orders/my-cart", { products: null  });
     }
   var cart = new Cart(req.session.cart)
   console.log(cart)
     res.render('orders/my-cart',{
          products: cart.generateArray(),
          totalPrice: cart.totalPrice,
          totalQty: cart.totalQty,
          user: req.user
     })

}