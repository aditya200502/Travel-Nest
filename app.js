const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PlaceList = require("./models/PlaceList.js")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/Review.js")
const placelist = require("./routes/placelist.js")


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

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
})

app.get("/", (req, res) => {
    res.send("Hi this is first response");
})

// Sample testing was done :-

// app.get("/testListing", async (req, res) => {
//     //New document creation
//     let SamplePlace = new PlaceList({
//         title: "My New Home",
//         description: "By the Sands",
//         price: 120000,
//         location: "Red Sea,Jordan",
//         country: "India",
//     })

//     await SamplePlace.save();
//     console.log("Sample was tested");
//     res.send("Sample testing is done");
// })


//Reviews :-
//POST Reviews route
app.post("/placelist/:id/reviews" ,wrapAsync(async (req, res) => {

    let place = await PlaceList.findById(req.params.id);
    let newReview = new Review(req.body.review);
    place.reviews.push(newReview);

    await newReview.save();
    await place.save()
    
    res.redirect(`/placelist/${req.params.id}`);
}))

//Delete Reviews Route :-
app.delete("/placelist/:id/reviews/:reviewId",wrapAsync(async(req,res) => {
     
    let {id,reviewId} = req.params;

    await PlaceList.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/placelist/${id}`);
}))

app.use("/placelist",placelist)

// Error handling middleware is being defined :-
// It is made firstly for new route :-
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err })
    //res.status(statusCode).send(message);
})



