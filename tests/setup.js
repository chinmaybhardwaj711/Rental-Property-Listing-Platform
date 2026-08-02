const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod;

// Set required environment variables BEFORE app.js is imported
process.env.SECRET = "test-secret";


beforeAll(async () => {
    mongod = await MongoMemoryServer.create();

    process.env.ATLASDB_URL = mongod.getUri();

    await mongoose.connect(process.env.ATLASDB_URL);
}, 30000);

afterEach(async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});