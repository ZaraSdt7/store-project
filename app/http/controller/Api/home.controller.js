const createerror=require("http-errors");
const { authSchema } = require("../../validations/user/auth.Schema");
const Controller = require("../controller")

module.exports=new  (class HomeController extends Controller{
async IndexPage(req,res,next){
try {
    return res.status(200).send("index page store") 
} catch (error) {
  next(error)  
}
    
}
})();
