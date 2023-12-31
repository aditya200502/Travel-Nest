const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const PlaceList = require("../models/PlaceList.js")
const Review = require("../models/Review.js")


//Reviews :-
//POST Reviews route
router.post("/" ,wrapAsync(async (req, res) => {

    let place = await PlaceList.findById(req.params.id);
    let newReview = new Review(req.body.review);
    place.reviews.push(newReview);

    await newReview.save();
    await place.save()
    
    res.redirect(`/placelist/${req.params.id}`);
}))

//Delete Reviews Route :-
router.delete("/:reviewId",wrapAsync(async(req,res) => {
     
    console.log("working fine");
    let {id,reviewId} = req.params;

    console.log(id);
    console.log(reviewId);
    await PlaceList.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/placelist/${id}`);
}))

module.exports = router;