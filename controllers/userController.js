exports.loginPage = (req, res) => {
    const messages = req.flash("error");
    res.render('user/login', {
        title: 'Takeaways | login to your account',
        messages: messages,
    })
}

exports.registerPage = (req, res) => {
    const messages = req.flash("error");
    res.render('user/register', {
        title: 'Takeaway | Create new account',
        messages: messages,
    })
}

exports.myProfilePage = (req, res) => {
    userId = req.params.userId
    res.render('user/my-profile', {
        user: req.user,
        title: "Takeaway | " + req.user.firstname + " " + req.user.lastname
    })
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin === false) {
        return next()
    }
    req.flash('error', "Please login first and try again")
    res.redirect('/login')
}

exports.notLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}