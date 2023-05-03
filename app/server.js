const express=require("express");
const {default:mongoose}=require("mongoose");
const createerror=require("http-errors");
const morgan = require("morgan");
const path= require("path");
require("dotenv").config();
const swaggerUI=require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const Cors = require("cors");
const { AllRouter } = require("./router/router");
const { url } = require("inspector");

module.exports=class Application{
    #app=express();
    #DB_URL;
    #PORT;
constructor(PORT,DB_URL){
    this.#DB_URL=DB_URL;
    this.#PORT=PORT;
    this.ConfigApplication();
    this.initRedis();
    this.ConnectToMongoDB();
    this.CreateServer();
    this.CreateRouter();
    this.ErrorHandeling();

}
ConfigApplication(){
this.#app.use(Cors({origin:"*"}));    
this.#app.use(morgan("dev"));
this.#app.use(express.json());
this.#app.use(express.urlencoded({extended:true}));
this.#app.use(express.static(path.join(__dirname,"..","public")));
this.#app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(swaggerJSDoc({
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
          title:"projet store",
          version:"2.0.0",
          description:"the first project store",
          contact:{
            name:"zahra",
            url:"https://github.com/ZahraSdt7",
            email:"zahra.st7373@gmail.com"
          }  
        },
        servers:[
            {
            url:"http://localhost:5000"
            }
    ],
    components:{
        securitySchemes:{
        BearerAuth:{
        type:"http",
        scheme:"bearer",
        bearerFormat:"JWT"    
        }    
        }
    },
    security:[{BearerAuth:[]}]
    },
    apis:["./app/router/**/*.js"]
})
,
{expelorer:true}
))
}
CreateServer(){
const http=require("http");
http.createServer(this.#app).listen(this.#PORT,()=>{
    console.log("run => http://localhost:" + this.#PORT);
})
}
ConnectToMongoDB(){
mongoose.set('strictQuery', true);
mongoose.connect(this.#DB_URL,(error)=>{
    if(!error) return console.log("connect to DB");
    return console.log("connect faild to DB");
})

mongoose.connection.on("connected",()=>{
    console.log("mongoose connected to DB");
})
mongoose.connection.on("disconnected",()=>{
    console.log("mongoose disconnected to DB");
})
process.on("SIGINT",async()=>{
    await mongoose.connection.close();
    process.exit(0);
})
}
initRedis(){
    require("./utils/init_redis")
}
CreateRouter(){
this.#app.use(AllRouter);
}
ErrorHandeling(){
this.#app.use((req,res,next)=>{
   next(createerror.NotFound("Page Not Found"))
})
this.#app.use((error,req,res,next)=>{
    const servererror=createerror.InternalServerError();
    const StatusCode=error.status || servererror.status;
    const message=error.message || servererror.message
    return res.status(StatusCode).json({
        errors:{
            StatusCode,
             message
        }
        
    })
})
}
}