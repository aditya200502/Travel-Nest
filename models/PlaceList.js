const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./Review.js")

const PlaceListSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    image: {
        url: String,
        filename:String
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
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})

//New Schema is created for handling deletion with reviews
PlaceListSchema.post("findOneAndDelete", async (place) => {

    if (place) {
        await Review.deleteMany({ _id: { $in: place.reviews } });
    }
})

// Creation of Model
const PlaceList = mongoose.model("PlaceList", PlaceListSchema);

module.exports = PlaceList;