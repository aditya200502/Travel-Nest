const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const PlaceList = require("../models/PlaceList.js")
const Review = require("../models/Review.js")
const {isLoggedIn,isAuthor} = require("../middleware.js")

//Reviews :-
//POST Reviews route
router.post("/",isLoggedIn ,wrapAsync(async (req, res) => {

    let place = await PlaceList.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    place.reviews.push(newReview);

    await newReview.save();
    await place.save()

    req.flash("success","New Review is created")
    
    res.redirect(`/placelist/${req.params.id}`);
}))

//Delete Reviews Route :-
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(async(req,res) => {
     
    console.log("working fine");
    let {id,reviewId} = req.params;

    //console.log(id);
    //console.log(reviewId);
    await PlaceList.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success","Review is deleted")

    res.redirect(`/placelist/${id}`);
}))

module.exports = router;