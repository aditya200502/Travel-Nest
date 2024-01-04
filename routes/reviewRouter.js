const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isAuthor} = require("../middleware.js")
const {createRoute,deleteRoute} = require("../controllers/review.js")

//Reviews :-
//POST Reviews route :-
router.post("/",isLoggedIn ,wrapAsync(createRoute))

//Delete Reviews Route :-
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(deleteRoute))

module.exports = router;