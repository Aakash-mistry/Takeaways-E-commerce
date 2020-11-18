const Product = require("../models/product");
const Category = require("../models/category");
const Slider = require("../models/slider");
require("dotenv").config();
const accountSid = process.env.twilioAccountSid;
const accountAuthToken = process.env.twilioAccountAuthToken;
const twilio = require("twilio")(accountSid, accountAuthToken);

exports.homepage = async (req, res) => {
	const messages = req.flash("success");
	const product = await Product.find({status: true})
		.populate("category")
		.limit(12)
		.sort({ createdAt: -1 });
	const slider = await Slider.find()
		.sort({ createdAt: -1 })
		.limit(10)
		.sort({ createdAt: -1 });
	res.render("index", {
		title: "Welcome to takeaways",
		productLength: product.length,
		product,
		user: req.user,
		sliderLength: slider.length,
		slider,
		messages,
	});
};

exports.productById = async (req, res) => {
	const product = await Product.findById({
		_id: req.params.productId,
	}).populate("category");
	res.render("products/one-product", {
		title: "takeaway | " + product.title,
		product,
	});
};

exports.viewAllProducts = async (req, res) => {
	const categories = await Category.find({}).sort({ createdAt: -1 });
	if (req.query.filter === "low-to-high") {
		const products = await Product.find({status: true})
			.sort({ realPrice: 1 })
			.populate("category");
		res.render("products/all-products", {
			title: "Takeaways | View all products",
			productsLength: products.length,
			products,
			user: req.user,
			categoriesLength: categories.length,
			categories,
		});
	} else if (req.query.filter === "high-to-low") {
		const products = await Product.find({status: true})
			.sort({ realPrice: -1 })
			.populate("category");
		res.render("products/all-products", {
			title: "Takeaways | View all products",
			productsLength: products.length,
			products,
			user: req.user,
			categoriesLength: categories.length,
			categories,
		});
	} else {
		const products = await Product.find({status: true})
			.sort({ createdAt: -1 })
			.populate("category");
		res.render("products/all-products", {
			title: "Takeaways | view all products",
			productsLength: products.length,
			products,
			user: req.user,
			categoriesLength: categories.length,
			categories,
		});
	}
};

exports.productsByCategory = async (req, res) => {
	const categoryId = req.params.id;
	const categorySelected = await Category.findById({ _id: categoryId });
	const category = await Category.find({}).sort({ createdAt: -1 });
	const latestProduct = await Product.find({
		category: categoryId,
	}).populate("category");
	// console.log(product)
	res.render("products/product-category", {
		title: "takeaways | " + categorySelected.name,
		latestProductLength: latestProduct.length,
		products: latestProduct,
		categorySelected,
		categoriesLength: category.length,
		category,
	});
};

// TWILIO TEST ACCOUNT SENDING BESIC MESSAGES.
exports.twilioTest = async (req, res) => {
	twilio.messages
		.create({
			body:
				"This is test from Lit-ONE web service and messages from twilio",
			from: +12057512561,
			to: +918669026894,
		})
		.then((messages) => console.log("Message sent", messages.sid));
	res.end();
};
