const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner } = require("../middleware.js")
const { indexRoute, newRoute, showRoute, createRoute, editRoute, updateRoute, deleteRoute } = require("../controllers/placelist.js")

//Index and Create route :-
router
    .route("/")
    .get(wrapAsync(indexRoute))
    .post(
        isLoggedIn,
        wrapAsync(createRoute)
    )


//New Route :-
router.get("/new", isLoggedIn, newRoute)


//Show,Edit,Update route :-
router
    .route("/:id")
    .get(wrapAsync(showRoute))
    .put(isLoggedIn, isOwner, wrapAsync(updateRoute))
    .delete(isLoggedIn, isOwner, wrapAsync(deleteRoute))


//Error was coming as new was also considered as an id

//Edit Route :-
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editRoute))

module.exports = router;