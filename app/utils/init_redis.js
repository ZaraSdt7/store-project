const redisDB = require("redis");
const RedisClient = redisDB.createClient();
RedisClient.connect();
RedisClient.on("connect", () => console.log("connect Redis.."));
RedisClient.on("ready", () => console.log("Connect To Redis ready.."));
RedisClient.on("error", (err) => console.log("Redis Error:", err.message));
RedisClient.on("end", () => console.log("Disconnect Redis..."));
module.exports = RedisClient;
