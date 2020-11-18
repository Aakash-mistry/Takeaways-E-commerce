const passport = require("passport");
require("dotenv").config();
const accountSid = process.env.twilioAccountSid;
const accountAuthToken = process.env.twilioAccountAuthToken;
const twilio = require("twilio")(accountSid, accountAuthToken);

exports.passportCreateNewAccount = passport.authenticate("local-signup", {
	successRedirect: "/my-profile",
	failureRedirect: "/register",
	failureFlash: true,
});

exports.passportCustomerLogin = passport.authenticate("local-signin", {
    successRedirect: '/',
	failureRedirect: "/login",
	failureFlash: true,
});

exports.webAdminLogin = passport.authenticate("local-signin", {
	successRedirect: "/admin/dashboard",
	failureRedirect: "/admin/login",
	failureFlash: true,
});

exports.logoutUser = (req, res) => {
	req.logout();
	res.redirect("/");
};
