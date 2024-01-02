const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const placelist = require("./routes/placelist.js")
const review = require("./routes/review.js")
const session = require("express-session");
const flash = require("connect-flash");


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
const MongoUrl = 'mongodb://127.0.0.1:27017/TravelNest';

main()
    .then(() => {
        console.log("connected to DB");
    }).catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(MongoUrl);
}

//Session option is created :-
const sessionOptions = {
    secret : "mycode",
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() +  3 * 24 * 60 * 60 * 1000,
        maxAge : 3 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions)); 
app.use(flash());


//Flash Middleware :-
app.use((req,res,next) => {

    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.get("/",(req,res) => {
    res.send("Working well");
})

app.use("/placelist/:id/reviews",review)
app.use("/placelist",placelist)


app.listen(8080, () => {
    console.log("Server is listening to port 8080");
})
