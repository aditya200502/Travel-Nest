const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PlaceList = require("./models/PlaceList.js")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("./utils/wrapAsync.js");

//View engine set :-
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")))

//Major error fixed :-
app.use('/placelist/:id', express.static(path.join(__dirname, "public")))
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

//Index route :-
app.get("/placelist", async (req, res) => {
    const Places = await PlaceList.find({})
    res.render("places/index.ejs", { Places })
});

//Error was coming as new was also considered as an id

//New Route :-
app.get("/placelist/new", (req, res) => {
    res.render("places/new.ejs");
})
//Create Route :-
app.post("/placelist", wrapAsync(async (req, res, next) => {

    //let{title,description,image,price,country,location} = req.body;
    let placelist = req.body.placelist;

    const newPlacelist = new PlaceList(placelist);
    await newPlacelist.save();
    res.redirect("/placelist");


}))

//Show route :-
app.get("/placelist/:id", async (req, res) => {

    let { id } = req.params;

    const place = await PlaceList.findById(id);
    res.render("places/show.ejs", { place })
})


//Edit Route :-
app.get("/placelist/:id/edit", async (req, res) => {

    let { id } = req.params;
    const place = await PlaceList.findById(id);
    res.render("places/edit.ejs", { place });
})

//Update and Save Route:-
app.put("/placelist/:id", async (req, res) => {
    let { id } = req.params;
    await PlaceList.findByIdAndUpdate(id, { ...req.body.placelist });
    res.redirect(`/placelist/${id}`);
})

//Delete Route :-
app.delete("/placelist/:id", async (req, res) => {
    let { id } = req.params;
    const deletedPlace = await PlaceList.findByIdAndDelete(id);
    console.log(deletedPlace);
    res.redirect("/placelist");
})

// Error handling middleware is being defined :-
// It is made firstly for new route :-

app.use((err, req, res, next) => {
    res.send("Something went wrong")
}) 