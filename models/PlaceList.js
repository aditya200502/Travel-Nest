const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaceListSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String,
        
    },
    price:{
        type:String
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
})

// Creation of Model
const PlaceList = mongoose.model("PlaceList",PlaceListSchema);

export default PlaceList