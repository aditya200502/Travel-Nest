const PlaceList = require("../models/PlaceList.js")

//Index Route
module.exports.indexRoute = async (req, res) => {
    const Places = await PlaceList.find({})
    res.render("places/index.ejs", { Places })

}

//New Route
module.exports.newRoute = (req, res) => {
    res.render("places/new.ejs");
}

//Show Route
module.exports.showRoute = async (req, res) => {

    let { id } = req.params;

    const place = await PlaceList.findById(id)
        .populate({
            path: "reviews",
            populate: { 
                path: "author" 
            }, 
        })
        .populate("owner")

    if (!place) {
        req.flash("error", "Listing which you have requested does not exists")
        res.redirect("/placelist");
    }
    //console.log(place)
    res.render("places/show.ejs", { place })
}

//Create Route
module.exports.createRoute = async (req, res, next) => {

    //let{title,description,image,price,country,location} = req.body;
    let url = req.file.path;
    let filename = req.file.filename;

    let placelist = req.body.placelist;

    const newPlacelist = new PlaceList(placelist);
    newPlacelist.owner = req.user._id;
    newPlacelist.image = {url,filename};
    await newPlacelist.save();

    req.flash("success", "New place is added")
    res.redirect("/placelist");
}

//Edit Route
module.exports.editRoute = async (req, res) => {

    let { id } = req.params;
    const place = await PlaceList.findById(id);

    if (!place) {
        req.flash("error", "Listing which you have requested does not exists")
        res.redirect("/placelist");
    }

    res.render("places/edit.ejs", { place });
}

//Update and Save Route
module.exports.updateRoute = async (req, res) => {
    let { id } = req.params;
    let place = await PlaceList.findByIdAndUpdate(id, { ...req.body.placelist });

    if(typeof(req.file) !== "undefined"){

        let url = req.file.path;
        let filename = req.file.filename;
    
        place.image = {url,filename};
        await place.save()
    }
    req.flash("success", "Placelist is updated")
    res.redirect(`/placelist/${id}`);
}

//Delete Route
module.exports.deleteRoute = async (req, res) => {
    let { id } = req.params;

    const deletedPlace = await PlaceList.findByIdAndDelete(id);
    //console.log(deletedPlace);
    req.flash("success", "Placelist is deleted")
    res.redirect("/placelist");
}