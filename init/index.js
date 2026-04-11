const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
require("dotenv").config({ path: "../.env" });
const dbURL = process.env.ATLASDB_URL;
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

async function main() {
    await mongoose.connect(dbURL);
    console.log("Connected to DB");
}

main()
    .then(() => initDB())
    .catch((err) => console.log(err));

const initDB = async () => {
    try {
        await Listing.deleteMany({});

        // Find or create a default user
        let user = await User.findOne({ username: "admin" });

        if (!user) {
            const newUser = new User({
                email: "admin@gmail.com",
                username: "admin",
            });
            user = await User.register(newUser, "admin123");
            console.log("Default admin user created.");
        }

        // Geocode each listing location
        const listingsWithGeometry = await Promise.all(
            initData.data.map(async (obj) => {
                try {
                    const response = await geocodingClient
                        .forwardGeocode({
                            query: `${obj.location}, ${obj.country}`,
                            limit: 1,
                        })
                        .send();

                    const geometry =
                        response.body.features[0]?.geometry || {
                            type: "Point",
                            coordinates: [0, 0], // fallback
                        };

                    return {
                        ...obj,
                        owner: user._id,
                        geometry,
                    };
                } catch (err) {
                    console.log(`Geocoding failed for ${obj.location}`);
                    return {
                        ...obj,
                        owner: user._id,
                        geometry: {
                            type: "Point",
                            coordinates: [0, 0],
                        },
                    };
                }
            })
        );

        await Listing.insertMany(listingsWithGeometry);
        console.log("Data was initialized successfully!");
    } catch (err) {
        console.error("Error initializing data:", err);
    } finally {
        mongoose.connection.close();
    }
};