const Order = require('../models/order')
const Cart = require('../models/cart')

exports.checkoutPage = (req, res) => {
    if (!req.session.cart) {
        return res.render("orders/my-cart", { products: null });
    }
    const cart = new Cart(req.session.cart)
    const products = cart.generateArray()
    products.forEach(data => {
        // console.log(data)
        console.log(data.item._id, "Qty -", data.qty, "Price -", data.price)
    });
    console.log("Total Products Price -", cart.totalPrice, "Total Products Qty", cart.totalQty)
    res.render('orders/checkout', {
        title: 'Takeaways | placing order',
        user: req.user,
        products: cart.generateArray(),
        totalPrice: cart.totalPrice,
        totalQty: cart.totalQty,
    })
}

exports.placeingOrders = (req, res) => {
    const cart = new Cart(req.session.cart)
    const products = cart.generateArray()
    console.log(products.length)
    const placeOrder = new Order({
        user: req.user._id,
        customerName: req.body.customerName,
        customerNumber: req.body.customerNumber,
        customerEmail: req.body.email,
        customerAddress: req.body.addressLine,
        pincode: req.body.pincode,
        totalQty: cart.totalQty,
        payableAmount: cart.totalPrice,
        items: products.map(data => (
            console.log(data), {
                productId: data.item._id,
                productQty: data.qty,
                productPrice: data.price
            }
        )),
        paymentMode: 'COD'
    })

    placeOrder.save((err, data) => {
        if (err)
            console.log('Failed to placing orders' + err)
        else
        // console.log(data)
            req.flash('success', 'your order has been placed...')
        res.redirect('/my-orders')
    })
}

exports.myOrderRecord = async(req, res) => {
    const messages = req.flash('success')
    const orders = await Order.find({ user: req.user._id }).populate('items.productId')
    res.render('orders/my-orders', {
        title: 'Takeaways | My Orders',
        ordersLength: orders.length,
        orders,
        user: req.user,
        messages,
    })
}