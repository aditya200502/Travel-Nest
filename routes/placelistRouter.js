const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const PlaceList = require("../models/PlaceList.js")
const { isLoggedIn, isOwner } = require("../middleware.js")
const {indexRoute,newRoute,showRoute, createRoute, editRoute,updateRoute,deleteRoute} = require("../controllers/placelist.js")

//Index route :-
router.get("/", wrapAsync(indexRoute));

//Error was coming as new was also considered as an id

//New Route :-
router.get("/new", isLoggedIn, newRoute)

//Show route :-
router.get("/:id", wrapAsync(showRoute))

//Create Route :-
router.post("/", isLoggedIn, wrapAsync(createRoute))

//Edit Route :-
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editRoute))

//Update and Save Route:-
router.put("/:id", isLoggedIn, isOwner, wrapAsync(updateRoute))

//Delete Route :-
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteRoute))

module.exports = router;