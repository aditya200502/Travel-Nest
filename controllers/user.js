const User = require("../models/User.js");

//Signup Routes :-
module.exports.signupRoute=async (req, res) => {

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
}

//Login Route
module.exports.loginRoute = async(req,res) => {
    req.flash("success","Welcome back to TravelNest");

    let redirectUrl = res.locals.redirectUrl || "/placelist";
    res.redirect(redirectUrl);
}

//Logout Route
module.exports.logoutRoute = (req,res,next) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        }
        req.flash("success","User is Logged Out")
        res.redirect("/placelist");
    })
}