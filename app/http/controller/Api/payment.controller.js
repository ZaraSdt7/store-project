const createHttpError = require("http-errors");
const Controller = require("../controller");
const moment = require("moment-jalaali");
const { GetBascketOfUser, InvoiceNumberGenarator } = require("../../../utils/function");
const { default: axios } = require("axios");
const { PaymentModel } = require("../../models/payments");
const httpStatus = require("http-status");
const fetch = (...args)=> import ('node-fetch').then(({default:fetch})=>fetch(...args))
class PaymentController extends Controller{
async PaymentGatway(req,res,next){
try {
const user =req.user;
if(user?.bascket && user.bascket.courses.length == 0 && user?.bascket && user.bascket.products.length == 0) throw new createHttpError.BadRequest(".سبد شما خالی می باشد ")
const bascket = (await GetBascketOfUser(user))?.[0]
console.log(bascket)
if(!bascket?.payDetail?.paymentAmount) throw new  createHttpError.BadRequest("مشخصات پرداخت یافت نشد")
const Zarinpal_requestUrl = "https://api.zarinpal.com/pg/v4/payment/request.json"   
const ZarinpalGatwayUrl = "https://www.zarinpal.com/pg/StartPay";
const description = "پرداخت برای دوره یا محصولات" , amount = bascket?.payDetail?.paymentAmount;
const zarinpal_options ={
    merchant_id:process.env.ZARINPAL_MERCHID,
    amount,
    description,
    metadata:{
        email :user?.email || "example@example.com",
        mobile:user?.mobile || "093123456789"
    },
    callback_url:`${process.env.BASE_URL}:${process.env.APPLCATION_PORT}/verify`
}   
const RequestUrl = await axios.post(Zarinpal_requestUrl,zarinpal_options).then(result=>result.data)
const {authority, code} = RequestUrl.data; //destracture in data
await PaymentModel.create({  //save data payment
    InvoiceNumber: InvoiceNumberGenarator(),
    paymentDate:moment().format("jYYYY-MM-DD,HH:mm:ss.SSS"),
    amount,
    description,
    authority,
    user:user,
    verify:false,
    bascket
})
if(code == 100 && authority){
    return res.status(httpStatus.OK).json({
        statusCode:httpStatus.OK,
        data:{
            code,
            bascket,
            gatwayurl:`${ZarinpalGatwayUrl}/${authority}`
        }
    })

} throw createHttpError.BadRequest(" اتصال به درگاه پرداخت انجام نشد")
} catch (error) {
    next(error)
}    
}

}
module.exports ={
    PaymentController:new PaymentController()
}