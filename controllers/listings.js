
const Listing = require("../models/listing")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const redisClient = require("../utils/redisClient");
const Booking = require("../models/booking");

async function clearListingCache() {
    const keys = await redisClient.keys("listings:*");

    console.log("Keys:", keys);

    if (keys.length > 0) {
        await redisClient.del(...keys);
        console.log("🗑️ Listing cache cleared");
    }
}
// module.exports.index = async (req, res) => {
//  await redisClient.set("test", "hello");
// const value = await redisClient.get("test");

// console.log("Redis value =", value);

// res.send("Redis test completed");
// };

module.exports.index = async (req, res) => {
    console.log("***** NEW INDEX CONTROLLER *****");

    let { search, category } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    let filter = {};
const cacheKey = `listings:${page}:${category || "All"}:${search || ""}`;    if (search && search.trim() !== "") {
        filter.$text = {
            $search: search.trim(),
        };
    }

    // Category
    if (category && category.trim() !== "" && category !== "All") {
        filter.category = category;
    }
  console.log("Checking Redis...");

const cachedData = await redisClient.get(cacheKey);

console.log("Redis value:", cachedData);

if (cachedData) {
    console.log("✅ Cache Hit");

    return res.render(
        "listings/index.ejs",
        JSON.parse(cachedData)
    );
}

console.log("❌ Cache Miss");

    // Total listings
    const totalListings = await Listing.countDocuments(filter);

const allListing = await Listing.find(filter)
    .skip(skip)
    .limit(limit)
    .lean();
const data = {
    allListing,
    category: category || "",
    search: search || "",
    currentPage: page,
    totalPages: Math.ceil(totalListings / limit),
};

await redisClient.set(
    cacheKey,
    JSON.stringify(data),
    "EX",
    60
);

console.log("💾 Saved to Redis");

res.render("listings/index.ejs", data);
};
// module.exports.index = async (req, res) => {
//    console.log("***** NEW INDEX CONTROLLER *****");
//   let { search, category } = req.query;

//   const page = parseInt(req.query.page) || 1;
//   const limit = 9;
//   const skip = (page - 1) * limit;

//   let filter = {};
//   const cacheKey = `listings:${JSON.stringify(filter)}:page:${page}`;

// const cachedData = await redisClient.get(cacheKey);

// if (cachedData) {
//     console.log("✅ Cache Hit");
// }

//   // Search
//   if (search && search.trim() !== "") {
//     filter.$text = {
//       $search: search.trim(),
//     };
//   }

//   // Category
//   if (category && category.trim() !== "" && category !== "All") {
//     filter.category = category;
//   }

//   // Total listings after applying filter
//   const totalListings = await Listing.countDocuments(filter);

//   // Fetch current page
//   const allListing = await Listing.find(filter)
//     .skip(skip)
//     .limit(limit)
//     .lean();


   
//      try {
//     await redisClient.set(
//         cacheKey,
//         JSON.stringify(allListing),
//         {
//             EX: 60,
//         }
//     );

//     console.log("✅ Saved to Redis");
// } catch (err) {
//     console.error("SET ERROR:", err);
// }

// console.log({
//   currentPage: page,
//   totalPages: Math.ceil(totalListings / limit),
// });



//   res.render("listings/index.ejs", {
//     allListing,
//     category,
//     search,
//     currentPage: page,
//     totalPages: Math.ceil(totalListings / limit),
//   });
// };

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
    const cacheKey = `listing:${id}`;
    const cachedData = await redisClient.get(cacheKey);

if (cachedData) {
    console.log("✅ Listing Cache Hit");

    return res.render(
        "listings/show.ejs",
        JSON.parse(cachedData)
    );
}

console.log("❌ Listing Cache Miss");
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
    const bookings = await Booking.find({
        listing: id,
        status: "confirmed",
    })
    .select("checkIn checkOut")
    .lean();


    // Handle missing owner for seeded data
    if (!listing.owner) {
        listing.owner = { username: "Admin" };
    }
        await redisClient.set(
    cacheKey,
    JSON.stringify({
        listing,
        mapToken: process.env.MAP_TOKEN,
         bookings,
    }),
    "EX",
    60
);

console.log("💾 Listing Saved to Redis");

    console.log(listing);
    res.render("listings/show.ejs", {
        listing,
        mapToken: process.env.MAP_TOKEN,
        bookings,
    });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
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
    await clearListingCache();
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

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing }
    );

    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = { url, filename };
        await listing.save();
    }

    await clearListingCache();
    await redisClient.del(`listing:${id}`);
console.log("🗑️ Individual Listing Cache Cleared");

    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
};


module.exports.destroy = async(req,res)=>{
    let {id} = req.params;
    let deletedData =await Listing.findByIdAndDelete(id)
    await clearListingCache();
    await redisClient.del(`listing:${id}`);
console.log("🗑️ Individual Listing Cache Cleared");
    console.log(deletedData);
    req.flash("success", " listing deleted");
    res.redirect("/listings")

}

