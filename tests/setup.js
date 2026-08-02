const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();

    process.env.ATLASDB_URL = mongod.getUri();
    process.env.SECRET = "test-secret";

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