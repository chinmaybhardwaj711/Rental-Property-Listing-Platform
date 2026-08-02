const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 8080;
const dbURL = process.env.ATLASDB_URL;

async function startServer() {
    try {
        await mongoose.connect(dbURL);
        console.log("✅ Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB");
        console.error(err);
        process.exit(1);
    }
}

startServer();