const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("./users/signup.ejs")
})

router.post("/signup", wrapAsync(async (req, res) => {

    try {

        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.flash("success", "User registered successfully")

        res.redirect("/placelist");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/placelist");
    }
}))

router.get("/login",(req,res) => {
    res.render("./users/login.ejs")
})

router.post("/login",passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),async(req,res) => {
    req.flash("success","Welcome back to TravelNest");
    res.redirect("/placelist");
})

module.exports = router;