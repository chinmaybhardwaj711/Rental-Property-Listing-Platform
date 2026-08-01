

const Redis = require("ioredis");

const redisClient = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
});

redisClient.on("connect", () => {
    console.log("✅ Redis Connected");
});

redisClient.on("error", (err) => {
    console.log("❌ Redis Error:", err.message);
     console.error(err);
});

// Clear all cached listing pages
async function clearListingsCache() {
    const stream = redisClient.scanStream({
        match: "listings:*",
    });

    stream.on("data", (keys) => {
        if (keys.length) {
            const pipeline = redisClient.pipeline();

            keys.forEach((key) => pipeline.del(key));

            pipeline.exec();
        }
    });
}

module.exports = redisClient;
module.exports.clearListingsCache = clearListingsCache;