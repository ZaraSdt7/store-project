const Controller = require("../controller");
const moment = require("jalali-moment");
const fetch = (...args)=> import ('node-fetch')
class PaymentController extends Controller{
PaymentGatway(req,res,next){
try {
    
} catch (error) {
    next(error)
}    
}
}
module.exports ={
    PaymentController:new PaymentController()
}