// Checks if a new booking overlaps with any existing booking
function hasOverlap(existingBookings, newCheckIn, newCheckOut) {
    return existingBookings.some(
        (booking) =>
            newCheckIn < booking.checkOut &&
            newCheckOut > booking.checkIn
    );
}

// Builds the MongoDB query for overlapping bookings
function buildOverlapQuery(
    listingId,
    checkIn,
    checkOut,
    excludeBookingId = null
) {
    const query = {
        listing: listingId,
        status: { $ne: "cancelled" },
        checkIn: { $lt: checkOut },
        checkOut: { $gt: checkIn },
    };

    if (excludeBookingId) {
        query._id = { $ne: excludeBookingId };
    }

    return query;
}

module.exports = {
    hasOverlap,
    buildOverlapQuery,
};