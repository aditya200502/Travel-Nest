const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveUrl } = require("../middleware.js");


//Signup Routes :-
router.get("/signup", (req, res) => {
    res.render("./users/signup.ejs")
})

router.post("/signup", wrapAsync(async (req, res) => {

    try {

        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        //Just after signup user should be logged in
        req.login(registeredUser,(err)=> {
            if(err){
                return next(err);
            }
            req.flash("success", "User registered successfully")
            res.redirect("/placelist");
        })

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/placelist");
    }
}))

//Login Routes :-

router.get("/login",(req,res) => {
    res.render("./users/login.ejs")
})

router.post("/login",saveUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),async(req,res) => {
    req.flash("success","Welcome back to TravelNest");

    let redirectUrl = res.locals.redirectUrl || "/placelist";
    res.redirect(redirectUrl);
})

//Logout Routes :-
router.get("/logout",(req,res,next) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        }
        req.flash("success","User is Logged Out")
        res.redirect("/placelist");
    })
})

module.exports = router;