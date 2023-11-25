const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaceListSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: "https://unsplash.com/photos/a-person-standing-in-a-canyon-surrounded-by-rocks-xXqWVUvf_Gw?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
        set: (v) => v === "" ? "https://unsplash.com/photos/a-person-standing-in-a-canyon-surrounded-by-rocks-xXqWVUvf_Gw?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash" : v,
    },
    price: {
        type: String
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
})

// Creation of Model
const PlaceList = mongoose.model("PlaceList", PlaceListSchema);

module.exports = PlaceList;