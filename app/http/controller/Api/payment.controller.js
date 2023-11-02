const createHttpError = require("http-errors");
const Controller = require("../controller");
const moment = require("jalali-moment");
const { GetBascketOfUser, InvoiceNumberGenarator } = require("../../../utils/function");
const { default: axios } = require("axios");
const { PaymentModel } = require("../../models/payments");
const httpStatus = require("http-status");
const fetch = (...args)=> import ('node-fetch').then(({default:fetch})=>fetch(...args))
class PaymentController extends Controller{
async PaymentGatway(req,res,next){
try {
const user =req.user;
if(user.bascket.courses.length == 0 && user.bascket.products.length == 0) throw createHttpError.BadRequest(".سبد شما خالی می باشد ")
const bascket = (await GetBascketOfUser(user._id))?.[0]
if(!bascket?.payDetail?.paymentAmount) throw createHttpError.BadRequest("مشخصات پرداخت یافت نشد")
const Zarinpal_requestUrl = "https://api.zarinpal.com/pg/v4/payment/request.json"   
const ZarinpalGatwayUrl = "https://www.zarinpal.com/pg/StartPay";
const description = "پرداخت برای دوره یا محصولات" , amount = bascket?.payDetail?.paymentAmount;
const zarinpal_options ={
    merchant_id,
    amount,
    description,
    metadata:{
        email :user?.email || "example@example.com",
        mobile:user.mobile
    },
    callback_url:`${process.env.BASE_URL}${process.env.APPLCATION_PORT}/verify`
}   
const RequestUrl = await axios.post(Zarinpal_requestUrl,zarinpal_options).then(result=>result.data)
const {authority, code} = RequestUrl.data; //destracture in data
await PaymentModel.create({  //save data payment
    InvoiceNumber: InvoiceNumberGenarator(),
    paymentDate:moment().format("jYYYY-MM-DD,HH:mm:ss.SSS"),
    amount,
    description,
    authority,
    user:user_id,
    verify:false,
    bascket
})
if(code == 100 && authority){
    return res.status(httpStatus.OK).json({
        statusCode:httpStatus.OK,
        data:{
            code,
            gatwayurl:`${ZarinpalGatwayUrl}/${authority}`
        }
    })

} throw createHttpError.BadRequest(" پارامتر ارسال شده صحیح نمی باشد")
} catch (error) {
    next(error)
}    
}

}
module.exports ={
    PaymentController:new PaymentController()
}