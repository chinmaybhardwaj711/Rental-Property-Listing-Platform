const Listing = require("../models/listing")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
  let { search, category } = req.query;
  let filter = {};

  // SEARCH FILTER
  if (search && search.trim() !== "") {
    filter.$or = [
      { location: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
      { title: { $regex: search, $options: "i" } }
    ];
  }

  // CATEGORY FILTER (only if valid)
  if (category && category.trim() !== "" && category !== "All") {
    filter.category = category;
  }

  const allListing = await Listing.find(filter);

  // console.log("Total Listings in DB:", await Listing.countDocuments());
  // console.log("Listings Displayed:", allListing.length);
  // console.log("Active Filter:", filter);

  res.render("listings/index.ejs", {
    allListing,
    category,
    search
  });

  // console.log("Listings Displayed:", allListing.length);
};


// module.exports.showListing = async (req,res)=>{
//     let {id} = req.params;
//     const listing = await Listing.findById(id).populate( {path: "reviews", populate: {
//         path: "author",
//     },
// }).populate("owner");
//     if (!listing) {
//         req.flash("error", "Listing you requested for does not exist");
//         return res.redirect("/listings");
//     }
//     console.log(listing);
//     res.render("listings/show.ejs", {listing, mapToken: process.env.MAP_TOKEN},
        
//     )
// }
module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }

    // Handle missing owner for seeded data
    if (!listing.owner) {
        listing.owner = { username: "Admin" };
    }

    console.log(listing);
    res.render("listings/show.ejs", {
        listing,
        mapToken: process.env.MAP_TOKEN,
    });
};


module.exports.createListing = async (req,res,next)=>{

let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send();
  

 
  


    // if (!req.body.listing){
    //     throw new ExpressError(400, "Send valid data for listing")
    // }
   let url = req.file.path;
   let filename = req.file.filename;
   console.log(url, "..", filename);
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = response.body.features[0]?.geometry;
    let savedListing = await newListing.save();
    console.log(savedListing);
    // await newListing.save();
    console.log(newListing);
    req.flash("success", "New listing created");
    res.redirect("/listings")
}


module.exports.renderEditForm = async (req,res)=>{
    let  {id} = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
         req.flash("error","Listing you requested for does not exist ")
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload" ,"/upload/h_300,w_250")
    res.render("listings/edit.ejs", {listing, originalImageUrl} );
}


module.exports.updateListing = async(req,res)=>{
     let {id} = req.params;
   let listing=  await Listing.findByIdAndUpdate(id, { ...req.body.listing});
   if(typeof req.file != "undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url, filename};
     await listing.save();
   }
    req.flash("success", "Listing updated")
    res.redirect(`/listings/${id}`)
}


module.exports.destroy = async(req,res)=>{
    let {id} = req.params;
    let deletedData =await Listing.findByIdAndDelete(id)
    console.log(deletedData);
    req.flash("success", " listing deleted");
    res.redirect("/listings")

}

