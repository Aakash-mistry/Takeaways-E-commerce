const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true
	},
	items: [{
		productId: { type: mongoose.Schema.Types.ObjectId, ref:'product', required: true },
		productQty: { type: Number, required: true },
		productPrice: { type: Number, required: true },
		createdAt: {type:Date, default: Date.now}
	}],
	totalQty: {
		type: Number,
		required: true
	},
	payableAmount: {
		type: Number,
		required: true
	},
	customerName: {
		type: String,
		required: true,
		trim: true
	},
	customerNumber: {
		type: Number,
		required: true
	},
	pincode: {
		type: Number,
		required: true
	},
	customerAddress: {
		type: String,
		required: true,
		trim: true
	},
	customerEmail: {
		type: String,
		required: true
	},
	orderStatus: {
		type: String,
		enum: ['placed', 'packed', 'shipped', 'outForDelivery', 'delivered', 'cancelled'],
		default: 'placed',
	},
	// TODO : Add payment fields - Payment mode, payment status
}, { timestamps: true })

module.exports = mongoose.model("order", orderSchema)
