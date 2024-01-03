module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //User is not logged in save originalUrl
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in before creating a new placelist");
        return res.redirect("/login");
    }
    next()
}

module.exports.saveUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}
