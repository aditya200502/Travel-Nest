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
//POST route
app.post("/placelist/:id/reviews" ,wrapAsync(async (req, res) => {

    let place = await PlaceList.findById(req.params.id)
    let newReview = new Review(req.body.review);
    place.reviews.push(newReview);

    await newReview.save();
    await place.save()
    
    res.redirect(`/placelist/${req.params.id}`);
}))


//Index route :-
app.get("/placelist", wrapAsync(async (req, res) => {
    const Places = await PlaceList.find({})
    res.render("places/index.ejs", { Places })

}));

//Error was coming as new was also considered as an id

//New Route :-
app.get("/placelist/new", (req, res) => {
    res.render("places/new.ejs");
})
//Create Route :-
app.post("/placelist",wrapAsync(async (req, res, next) => {

    //let{title,description,image,price,country,location} = req.body;
    let placelist = req.body.placelist;

    const newPlacelist = new PlaceList(placelist);
    await newPlacelist.save();
    res.redirect("/placelist");


}))

//Show route :-
app.get("/placelist/:id", wrapAsync(async (req, res) => {

    let { id } = req.params;

    const place = await PlaceList.findById(id);
    res.render("places/show.ejs", { place })
}))


//Edit Route :-
app.get("/placelist/:id/edit",wrapAsync(async (req, res) => {

    let { id } = req.params;
    const place = await PlaceList.findById(id);
    res.render("places/edit.ejs", { place });
}))

//Update and Save Route:-
app.put("/placelist/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await PlaceList.findByIdAndUpdate(id, { ...req.body.placelist });
    res.redirect(`/placelist/${id}`);
}))

//Delete Route :-
app.delete("/placelist/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedPlace = await PlaceList.findByIdAndDelete(id);
    console.log(deletedPlace);
    res.redirect("/placelist");
}))

//Match with every request :-
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not Found!"));
})

// Error handling middleware is being defined :-
// It is made firstly for new route :-
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err })
    //res.status(statusCode).send(message);
})


