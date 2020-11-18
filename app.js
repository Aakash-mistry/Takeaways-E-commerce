var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const adminRouter = require("./routes/admin");
const categoryRouter = require("./routes/category");
const orderRouter = require("./routes/order");

const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const Mongo = require("connect-mongo")(session);
const expressHbs = require("express-handlebars");
const mongoose = require("mongoose");
const Handlebars = require("handlebars");
const {
	allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

var app = express();
require("dotenv").config();
require("./config/passport");

// database connection
mongoose.connect(
	process.env.database,
	{
		useCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) {
			console.log(err, "Error");
		} else {
			console.log(`connected to database`);
		}
	}
);

// view engine setup
app.engine(
	".hbs",
	expressHbs({
		defaultLayout: "layout",
		extname: ".hbs",
		handlebars: allowInsecurePrototypeAccess(Handlebars),
	})
);
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(
	express.urlencoded({
		extended: false,
	})
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// session initialize
app.use(
	session({
		secret: "offline",
		resave: true,
		saveUninitialized: true,
		store: new Mongo({ mongooseConnection: mongoose.connection }),
		cookie: { maxAge: 100 * 60 * 1000 },
	})
);

app.use((req, res, next) => {
	res.locals.login = req.isAuthenticated();
	res.locals.session = req.session;
	next();
});

// passport initializing
app.use(passport.initialize());
app.use(passport.session());

// Start session for checking user
app.use((req, res, next) => {
	res.locals.login = req.isAuthenticated();
	res.locals.session = req.session;
	next();
});

// valdation initializing
app.use(flash());

app.use("/", indexRouter);
app.use("/", productRouter);
app.use("/", cartRouter);
app.use("/", userRouter);
app.use("/", orderRouter);
app.use("/admin", adminRouter);
app.use("/admin", categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
