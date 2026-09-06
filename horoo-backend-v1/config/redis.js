// const { Redis } = require("@upstash/redis");

// require("dotenv").config();

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

// module.exports = redis;


const { createClient } = require("redis");

const redis = createClient({
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: false,
  },
});

redis.on("error", (error) => {
  console.error("Redis error:", error);
});

const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
    console.log("Redis connected");
  }
};

module.exports = {
  redis,
  connectRedis,
};
