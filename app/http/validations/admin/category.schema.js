const joi=require("@hapi/joi");
const { mongoIDpattern } = require("../../../utils/constans");
const categorySchema=joi.object({
title:joi.string().min(5).max(13).error(new Error("عنوان دسته بندی صحیح نمی باشد")),
parent:joi.string().allow('').pattern(mongoIDpattern).allow("").error(new Error("شناسه ارسال شده صحیح نمی باشد"))    
})
module.exports={
    categorySchema
}