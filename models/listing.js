const mongoose = require("mongoose");
// const reviews = require("./reviews");
// const { ref } = require("joi");
const Schema = mongoose.Schema;
const Review = require("./reviews.js")

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    } ,
    description: String,
    image: {
        url: String,
        filename:String,

    },
    price: Number,
    location: String,
    country: String,

    category: {
  type: String,
  enum: [
    "Trending",
    "Rooms",
    "Iconic Cities",
    "Mountains",
    "Castles",
    "Amazing Pools",
    "Camping",
    "Farms",
    "Arctic",
    "Domes",
    "Boats"
  ],
  default: "Trending"
},


    reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: "Review"
    },
],
 owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
   },
   geometry: {
     type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: { 
      type: [Number],
      required: true
    }
   }
   

 
});
listingSchema.index({category:1 , title:1 , location:1});
 

listingSchema.post("findOneAndDelete", async (listingDoc)=>{
    if(listingDoc){
         await Review.deleteMany({_id: {$in : listingDoc.reviews}})

    }
})





const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
