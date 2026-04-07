const express = require("express");
const reviews = require("../models/reviews");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js")
const Review = require("../models/reviews.js")
const ExpressError = require("../utils/ExpressError.js")
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")

const reviewController = require("../controllers/reviews.js");

//review post route
router.post("/",validateReview,isLoggedIn ,wrapAsync(reviewController.createReview));






 //Delete reviews route
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor,
     wrapAsync (reviewController.destroyReview));

//error handling middleware
// app.use((err,req,res,next)=>{
//     res.send("Something went wrong")
// })


module.exports = router;
