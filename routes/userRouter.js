const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User.js");
const wrapAsync = require("../utils/wrapAsync.js");

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

module.exports = router;