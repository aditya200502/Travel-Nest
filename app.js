if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const placelistRouter = require("./routes/placelistRouter.js")
const reviewRouter = require("./routes/reviewRouter.js")
const session = require("express-session");
const MongoStore = require("connect-mongo")
const flash = require("connect-flash");
const passport = require("passport")
const passportLocal = require("passport-local");
const User = require("./models/User.js")
const userRouter = require("./routes/userRouter.js")


//View engine set :-
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")))

//Major error fixed :-
app.use('/placelist/:id', express.static(path.join(__dirname, "public")))
app.use('/placelist/:id/reviews', express.static(path.join(__dirname, "public")))
app.engine("ejs", ejsMate);


//Database creation :-
const MongoUrl = process.env.ATLAS_URL

main()
    .then(() => {
        console.log("connected to DB");
    }).catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(MongoUrl);
}


//Mongostore is created :-
const mongostore = MongoStore.create({
    mongoUrl: MongoUrl,
    crypto: {
        secret: "mycode"
    },
    touchAfter: 24 * 3600
})

//Session option is created :-
const sessionOptions = {
    store: mongostore,
    secret: "mycode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 3 * 24 * 60 * 60 * 1000,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// //Demo User is created for testing :-
// app.get("/demouser", async(req,res) => {
//     let fakeUser = new User({
//         email:'adi@gmail.com',
//         username:"Adi"
//     });

//     let newUser = await User.register(fakeUser,"Adi12@");
//     console.log(newUser);
//     res.send(newUser); 
// })

//Flash Middleware :-
app.use((req, res, next) => {

    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// app.get("/",(req,res) => {
//     res.send("Working well");
// })

app.use("/placelist/:id/reviews", reviewRouter)
app.use("/placelist", placelistRouter)
app.use("/", userRouter)


app.listen(8080, () => {
    console.log("Server is listening to port 8080");
})
