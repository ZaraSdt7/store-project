const express=require("express");
const {default:mongoose}=require("mongoose");
const path=require("path");
const { AllRouter } = require("./router/router");

module.exports=class Application{
    #app=express();
    #DB_URL;
    #PORT;
constructor(PORT,DB_URL){
    this.#DB_URL=DB_URL;
    this.#PORT=PORT;
    this.ConfigApplication();
    this.ConnectToMongoDB();
    this.CreateServer();
    this.CreateRouter();
    this.ErrorHandeling();

}
ConfigApplication(){
this.#app.use(express.json());
this.#app.use(express.urlencoded({extended:true}));
this.#app.use(express.static(path.join(__dirname,"..","public")));
}
CreateServer(){
const http=require("http");
http.createServer(this.#app).listen(this.#PORT,()=>{
    console.log("run => http://localhost:" + this.#PORT);
})
}
ConnectToMongoDB(){
mongoose.connect(this.#DB_URL,(error)=>{
    if(!error) return console.log("connect to DB");
    return console.log("connect faild to DB");
})
}
CreateRouter(){
this.#app.use(AllRouter);
}
ErrorHandeling(){
this.#app.use((req,res,next)=>{
    return res.status(404).json({
        statuscode:404,
        message:"address not found it!"
    })
})
this.#app.use((req,res,next)=>{
    const StatusCode=error.status || 500;
    const message=error.message || "Internal Server Error"
    return res.status(StatusCode).json({
        StatusCode,
        message
    })
})
}
}