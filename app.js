const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PlaceList = require("./models/PlaceList.js")
const path = require("path")


//View engine set :-
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))

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
app.get("/placelist",async (req,res) => {
    const Places = await PlaceList.find({})
    res.render("places/index.ejs",{Places})
});

//Show route :-
app.get("/placelist/:id",async (req,res) => {

    let {id} = req.params;

    const place = await PlaceList.findById(id);
    res.render("places/show.ejs",{place})
})