const joi=require("@hapi/joi");
const GetOtpSchema=joi.object({
    // email:joi.string().lowercase().trim().email().required(),
    // password:joi.string().min(6).max(10).trim().required(),
    mobile:joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده نادرست است"))
})
const CheckOtpSchema=joi.object({
   mobile:joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده نادرست است")),
   code:joi.string().min(4).max(6).error(new Error("کد ارسال شده صحیح نیست"))
})
module.exports={
    GetOtpSchema,
    CheckOtpSchema
}