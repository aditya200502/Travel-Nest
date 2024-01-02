const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const PlaceList = require("../models/PlaceList.js")

//Index route :-
router.get("/", wrapAsync(async (req, res) => {
    const Places = await PlaceList.find({})
    res.render("places/index.ejs", { Places })

}));

//Error was coming as new was also considered as an id

//New Route :-
router.get("/new", (req, res) => {
    res.render("places/new.ejs");
})

//Show route :-
router.get("/:id", wrapAsync(async (req, res) => {

    let { id } = req.params;

    const place = await PlaceList.findById(id).populate("reviews");;
    res.render("places/show.ejs", { place })
}))

//Create Route :-
router.post("/",wrapAsync(async (req, res, next) => {

    //let{title,description,image,price,country,location} = req.body;
    let placelist = req.body.placelist;

    const newPlacelist = new PlaceList(placelist);
    await newPlacelist.save();

    req.flash("success","New place is added")
    res.redirect("/placelist");


}))

//Edit Route :-
router.get("/:id/edit",wrapAsync(async (req, res) => {

    let { id } = req.params;
    const place = await PlaceList.findById(id);
    res.render("places/edit.ejs", { place });
}))

//Update and Save Route:-
router.put("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await PlaceList.findByIdAndUpdate(id, { ...req.body.placelist });

    req.flash("success","Placelist is updated")
    res.redirect(`/placelist/${id}`);
}))

//Delete Route :-
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedPlace = await PlaceList.findByIdAndDelete(id);
    console.log(deletedPlace);
    req.flash("success","Placelist is deleted")
    res.redirect("/placelist");
}))


module.exports = router;