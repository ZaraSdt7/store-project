const RedisClient = require("../utils/init_redis");
const { HomeRouter } = require("./Api");
const { UserAuthRouter } = require("./User/auth");
(async()=>{
    await RedisClient.set("key","value")
    const value=await RedisClient.get("key");
    console.log(value);
})();
const router=require("express").Router();
router.use("/user",UserAuthRouter)
router.use("/",HomeRouter)
module.exports={
    AllRouter:router
}