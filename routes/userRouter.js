const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveUrl } = require("../middleware.js");
const { signupRoute, loginRoute, logoutRoute } = require("../controllers/user.js")

//Signup Routes :-
router
    .route("/signup")
    .get((req, res) => {
        res.render("./users/signup.ejs")
    })
    .post(wrapAsync(signupRoute))

//Login Routes :-

router
    .route("/login")
    .get((req, res) => {
        res.render("./users/login.ejs")
    })
    .post(
        saveUrl,
        passport.authenticate(
            "local",
            {
                failureRedirect: "/login",
                failureFlash: true
            }),
        loginRoute)

//Logout Routes :-
router.get("/logout", logoutRoute)

module.exports = router;