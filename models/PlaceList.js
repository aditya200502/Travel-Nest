const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaceListSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1682695794816-7b9da18ed470?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1682695794816-7b9da18ed470?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
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