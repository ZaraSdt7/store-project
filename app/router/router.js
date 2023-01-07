const { VerifyAccessToken, CheckRole } = require("../http/middleware/VerifyAccessToken");
const RedisClient = require("../utils/init_redis");
const { AdminCategoryRoutes } = require("./Admin/admin.category");
const { HomeRouter } = require("./Api");
const { UserAuthRouter } = require("./User/auth");
const { DeveloperRoutes } = require("./User/develope");
(async()=>{
    await RedisClient.set("key","value")
    const value=await RedisClient.get("key");
    console.log(value);
})();
const router=require("express").Router();
router.use("/user",UserAuthRouter)
router.use("/admin",VerifyAccessToken,CheckRole("ADMIN"),AdminCategoryRoutes)
router.use("/developer",DeveloperRoutes)
router.use("/",HomeRouter)
module.exports={
    AllRouter:router
}