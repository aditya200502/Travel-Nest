const mongoose = require("mongoose");
const Initdata = require("./data.js")
const PlaceList = require("../models/PlaceList.js")

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

const initDB = async () => {
    //Deletion of sample data
    await PlaceList.deleteMany({});

    Initdata.data = Initdata.data.map((obj) => ({
        ...obj,
        owner: "65954a6dac1b59c6beda0e5f",
    }));
    await PlaceList.insertMany(Initdata.data);
    console.log("Data was initialized");
};

initDB();

