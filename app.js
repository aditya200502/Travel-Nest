const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PlaceList = require("./models/PlaceList.js")

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

app.get("/testListing", async (req, res) => {
    //New document creation
    let SamplePlace = new PlaceList({
        title: "My New Home",
        description: "By the Sands",
        price: 120000,
        location: "Red Sea,Jordan",
        country: "India",
    })

    await SamplePlace.save();
    console.log("Sample was tested");
    res.send("Sample testing is done");
})