const Category = require("../models/category");
const Product = require("../models/product");
const Slider = require("../models/slider");
const categorySlider = require("../models/indexproductfilters");
const Order = require("../models/order");

exports.adminLoginPage = (req, res) => {
	const messages = req.flash("error");
	res.render("admin/login", {
		title: "Takeaways Administrator Portal",
		messages: messages,
	});
};

exports.dashbaord = async (req, res) => {
	const category = await Category.find().sort({ createdAt: -1 });
	res.render("admin/dashboard/dashboard", {
		title: "Takeaway | admin portal",
		user: req.user,
		categoryLength: category.length,
		category,
	});
};

exports.viewCategory = async (req, res) => {
	const category = await Category.find().sort({ date: 1 });
	res.render("admin/dashboard/categories/view-categories", {
		title: "takeaways | view, edit, update, delete categories",
		user: req.user,
		categoryLength: category.length,
		category,
	});
};

exports.createTaglistForm = async (req, res) => {
	const category = await Category.find();
	const categoryLength = category.length;
	res.render("admin/dashboard/categories/create-taglist", {
		title: "Takeaways | create new category",
		categoryLength,
		user: req.user,
	});
};

exports.deleteTaglist = async (req, res) => {
	await Category.findOneAndDelete(
		{
			_id: req.params.dataId,
		},
		(err, data) => {
			if (err) {
				res.redirect(err);
			} else {
				//   console.log(data)
				res.redirect("/admin/view-taglist");
			}
		}
	);
};

exports.taglistForm = async (req, res) => {
	const category = await new Category({
		name: req.body.taglistName,
		description: req.body.taglistDescription,
	});
	try {
		const cate = await category.save();
		//    console.log(cate)
		res.redirect("/admin/view-taglist");
	} catch (err) {
		res.json(err);
	}
};

exports.categoryEditForm = async (req, res) => {
	const category = await Category.findById({ _id: req.params.categoryId });
	//     console.log(category)
	res.render("admin/dashboard/categories/edit-taglist", {
		title: "takeaways | " + category.name,
		category,
		user: req.user,
	});
};

exports.editTaglist = async (req, res) => {
	const data = await Category.findOneAndUpdate(
		{ _id: req.params.dataId },
		{
			$set: {
				name: req.body.taglist_name,
				description: req.body.taglist_description,
			},
		},
		(err, categoryData) => {
			if (err) return res.redirect("error" + err);
			else console.log(categoryData);
			return res.redirect("/admin/view-taglist");
		}
	);
};

exports.viewProducts = async (req, res) => {
	const messages = req.flash("success");
	const product = await Product.find().populate("category", "name");
	//     console.log(product)
	res.render("admin/dashboard/product/view-product", {
		title: "Takeaways | view, edit, create and delete of products",
		productLength: product.length,
		product,
		user: req.user,
		messages,
	});
};

exports.adminLogout = (req, res, next) => {
	//     req.logout()
	req.session.destroy((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
};

exports.isAdminLoggedIn = (req, res, next) => {
	if (req.isAuthenticated() && req.user.isAdmin) {
		return next();
	} else {
		return res.redirect("/");
	}
};

exports.notAdminLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	if (req.user.isAdmin === false) {
		return res.redirect("/");
	}
	res.redirect("/admin/dashboard");
};

exports.userIndexPage = async (req, res, next) => {
	const messages = req.flash("success");
	const error = req.flash("error");
	const slider = await Slider.find().sort({ createdAt: -1 });
	const categorySlide = await categorySlider
		.find()
		.sort({ createdAt: -1 })
		.populate("productCategoryId");
	res.render("admin/dashboard/homepage/view-user-index", {
		title: "Takeaways | Manage your homepage",
		sliderLength: slider.length,
		slider,
		categorySliderLength: categorySlide.length,
		categorySlide,
		user: req.user,
		error,
		messages,
	});
};

exports.sliderForm = (req, res) => {
	res.render("admin/dashboard/homepage/create-slider", {
		title: "Takeaways | create new slider images",
		user: req.user,
	});
};

exports.editSliderForm = async (req, res) => {
	const sliderImageId = req.params.id;
	const slider = await Slider.findById({ _id: sliderImageId });
	res.render("admin/dashboard/homepage/edit-slider", {
		title: "Takeaways | Edit slider details",
		slider,
	});
};

exports.sliderSaveBackend = (req, res) => {
	const slider = new Slider({
		caption: req.body.caption,
		captionDescription: req.body.sliderDescription,
		captionColour: req.body.captionColorName,
		animationName: req.body.animationName,
		reDirectionLink: req.body.link,
		sliderImage: req.body.photo,
	});
	slider.save((err, slider) => {
		if (err) {
			console.log(err);
		}
		req.flash("success", "Slider created successfully");
		res.redirect("/admin/view-users-homepage");
	});
};

exports.editSliderBackend = async (req, res) => {
	const sliderId = req.params.id;

	await Slider.findOneAndUpdate(
		{ _id: sliderId },
		{
			$set: {
				caption: req.body.caption,
				captionDescription: req.body.sliderDescription,
				captionColour: req.body.captionColorName,
				animationName: req.body.animationName,
				sliderImage: req.body.photo,
				reDirectionLink: req.body.link,
			},
		},
		(err, data) => {
			if (err) {
				req.flash("error", "falied to upadate somthing");
				res.redirect("/admin/view-users-homepage");
			} else {
				req.flash("success", "Slider updated successfully");
				// console.log(data)
				res.redirect("/admin/view-users-homepage");
			}
		}
	);
};

exports.deleteSliderImage = async (req, res) => {
	const sliderImageId = req.params.id;
	await Slider.findByIdAndDelete({ _id: sliderImageId }, (err, data) => {
		if (err) console.log(err);
		else
			req.flash(
				"success",
				"Slider deleted successfully, will be take effect sortly"
			);
		res.redirect("/admin/view-users-homepage");
	});
};

exports.createProductSlider = async (req, res) => {
	res.render("admin/dashboard/homepage/product-slider", {
		title: "Takeaways | Select product slider",
		user: req.user,
	});
};

exports.createproductSliderBackend = async (req, res) => {
	const productSlider = await categorySlider({
		productCategoryId: req.body.category,
		sliderTitle: req.body.title,
	});

	productSlider.save((err, data) => {
		if (err) {
			console.log(err);
		} else {
			req.flash("success", "Product slider is uploaded to database");
			res.redirect("/admin/view-users-homepage");
		}
	});
};

exports.viewAllOrders = async (req, res) => {
  const messages = req.flash('success')
  const receivedOrder = await Order.find().sort("createdAt: 1");
  console.log(messages)
	res.render("admin/dashboard/orders/view-all-orders", {
		title: "Takeaways | view all orders",
		user: req.user,
		receivedOrderLength: receivedOrder.length,
    receivedOrder,
    messages
	});
};

exports.viewOrderDetails = async (req, res) => {
	const orderId = req.params.id;
	const order = await Order.findById({ _id: orderId }).populate(
		"items.productId"
	);
	// console.log("This is your order",order)
	res.render("admin/dashboard/orders/view-order-details", {
		title: "Takeaways | Order details",
		order,
		user: req.user,
	});
};

exports.adminProfile = async (req, res) => {
	res.render("admin/profile/admin-profile", {
		title: "Takaways | admin profile",
		user: req.user,
	});
};

exports.deletingOrderManually = async (req, res) => {
	const orderId = req.params.id;
	await Order.findOneAndDelete({ _id: orderId }, (err, data) => {
		if (err) res.json(err);
		else req.flash("success", "Order manually deleted...");
		res.redirect("/admin/view-all-orders");
	});
};
