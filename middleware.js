const PlaceList = require("./models/PlaceList.js");
const Review = require("./models/Review.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //User is not logged in save originalUrl
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in");
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

module.exports.isOwner = async(req,res,next) => {
    
    let {id} = req.params;
    let place = await PlaceList.findById(id);
    if(! place.owner._id .equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this placelist")
        return res.redirect(`/placelist/${id}`);
    }
    next();
}

module.exports.isAuthor = async(req,res,next) => {
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(! review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review")
        return res.redirect(`/placelist/${id}`);
    }
    next();
}