const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Booking = require("../models/booking");
const { buildOverlapQuery } = require("../utils/bookingUtils");

module.exports.createBooking = async (req, res) => {
    const { id: listingId } = req.params;
    const { checkIn, checkOut } = req.body.booking;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
        req.flash("error", "Check-out must be after check-in.");
        return res.redirect(`/listings/${listingId}`);
    }

    const listing = await Listing.findById(listingId);

    if (!listing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }

    const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    const totalPrice = nights * listing.price;

    const session = await mongoose.startSession();

    let bookingFailed = false;

    try {
        await session.withTransaction(async () => {

            await Listing.findByIdAndUpdate(
                listingId,
                {
                    $inc: {
                        bookingLock: 1,
                    },
                },
                { session }
            );

            const overlapping = await Booking.find(
                buildOverlapQuery(
                    listingId,
                    checkInDate,
                    checkOutDate
                )
            ).session(session);

            if (overlapping.length > 0) {
                bookingFailed = true;
                return;
            }

            await Booking.create(
                [
                    {
                        listing: listingId,
                        user: req.user._id,
                        checkIn: checkInDate,
                        checkOut: checkOutDate,
                        totalPrice,
                        status: "confirmed",
                    },
                ],
                { session }
            );
        });
    } finally {
        await session.endSession();
    }

    if (bookingFailed) {
        req.flash(
            "error",
            "Those dates are already booked. Try different dates."
        );

        return res.redirect(`/listings/${listingId}`);
    }

    req.flash("success", "Booking confirmed!");

    res.redirect(`/listings/${listingId}`);
};