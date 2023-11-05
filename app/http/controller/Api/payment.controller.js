const createHttpError = require("http-errors");
const Controller = require("../controller");
const moment = require("moment-jalaali");
const { GetBascketOfUser, InvoiceNumberGenarator } = require("../../../utils/function");
const { default: axios } = require("axios");
const { PaymentModel } = require("../../models/payments");
const httpStatus = require("http-status");
const { UserModel } = require("../../models/users");
const fetch = (...args)=> import ('node-fetch').then(({default:fetch})=>fetch(...args))
class PaymentController extends Controller{
async PaymentGatway(req,res,next){
try {
const user =req.user;
if(user?.bascket && user.bascket.courses.length == 0 && user?.bascket && user.bascket.products.length == 0) throw new createHttpError.BadRequest(".سبد شما خالی می باشد ")
const bascket = (await GetBascketOfUser(user))?.[0]
//console.log(bascket)
if(!bascket?.payDetail?.paymentAmount) throw new  createHttpError.BadRequest("مشخصات پرداخت یافت نشد")
const Zarinpal_requestUrl = "https://api.zarinpal.com/pg/v4/payment/request.json"   
const ZarinpalGatwayUrl = "https://www.zarinpal.com/pg/StartPay";
const description = "پرداخت برای دوره یا محصولات" , amount = bascket?.payDetail?.paymentAmount;
const zarinpal_options = {
    merchant_id:process.env.ZARINPAL_MERCHID, // get merchanid in zarinpal document....
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
    verify:true,
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

} 
throw createHttpError.BadRequest(" اتصال به درگاه پرداخت انجام نشد")
} catch (error) {
    next(error)
}    
}
 async VerifyPayment(req,res,next){
try {
const{Authority:authority} =req.query;
const verifyURL = "https://api.zarinpal.com/pg/v4/payment/verify.json";
const payment =  await PaymentModel.findOne({authority})
if(!payment) throw new createHttpError.NotFound("تراکنش در انتظار پرداخت یافت نشد")
if(payment.verify) throw new createHttpError.BadRequest("تراکنش مورد نظر قبلا پرداخته شده")
const VerifyBody = JSON.stringify({ // body verify payment when give info
authority,
amount:payment.amount,
merchant_id:process.env.ZARINPAL_MERCHID     // give merchandid in zarinpal document!!

}) 
const verifyResult = await fetch(verifyURL,{
    method:"POST",
    headers:{
        'Content-Type':"application/json"
    },
    body: VerifyBody
}).json()
if(verifyResult.data.code == 100){
    await PaymentModel.updateOne({authority},{
        $set:{
            refID:verifyResult.data.ref._id,
            cardHash:verifyResult.data.card_hash,
            verify:true
        }
    })
    const user = await UserModel.findById(payment.user)
    await UserModel.updateOne({_id:payment.user},{
        $set:{
            Courses:[...payment?.bascket?.payDetail?.courseIDs || [], ...user.Courses],
            Products:[...payment?.bascket?.payDetail?.productsIDs || [] , ...user.Products],
            bascket:{
                courses:[],
                products:[]
            }
        }
    })
    return res.status(httpStatus.OK).json({
        statusCode:httpStatus.OK,
        data:{
            message:"پرداخت شما با موفقیت انجام شد"
        }
    })
}
throw new createHttpError.BadRequest("پرداخت انجام نشد در صورت کسر وجه طی 72 ساعت به حساب شما واریز میشود")
} catch (error) {
    next(error)
}    
}
}
module.exports ={
    PaymentController:new PaymentController()
}