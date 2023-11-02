const { graphqlHTTP } = require("express-graphql");
const { VerifyAccessToken, CheckRole } = require("../http/middleware/VerifyAccessToken");
const RedisClient = require("../utils/init_redis");
const { AdminRoutes } = require("./Admin/admin.router");
const { HomeRouter } = require("./Api");
const { UserAuthRouter } = require("./User/auth");
const { DeveloperRoutes } = require("./User/develope");
const { GraphQLConfig } = require("../utils/graphql.config");
const { ApiPayment } = require("./Api/payment");
(async()=>{
    await RedisClient.set("key","value")
    const value=await RedisClient.get("key");
    console.log(value);
})();
const router=require("express").Router();
router.use("/user",UserAuthRouter)
router.use("/admin",VerifyAccessToken,AdminRoutes)
router.use("/developer",DeveloperRoutes)
router.use("/graphql",graphqlHTTP(GraphQLConfig))
router.use("/",HomeRouter),
router.use("/",ApiPayment)
module.exports={
    AllRouter:router
}