const joi=require("@hapi/joi");
const createerror=require("http-errors");
const { mongoIDpattern } = require("../../../utils/constans");
const CreateBlogSchema=joi.object({
title:joi.string().min(3).max(7).error(createerror.BadRequest("عنوان دسته بندی صحیح نمی باشد")),
text:joi.string().error(createerror.BadRequest("متن ارسال شده صحیح نمی باشد")),
short_text:joi.string().error(createerror.BadRequest("متن ارسال شده صحیح نمی باشد")),
filename:joi.string().pattern(/(\.png|\.jpeg|\.jpg|\.webp|\.gif)$/).error(createerror.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
tags:joi.array().min(0).max(5).error(createerror.BadRequest("برچسب نمی تواندبیشتر از 5 تا باشد")),
categories:joi.string().pattern(mongoIDpattern).error(createerror.BadRequest("دسته بندی موردنظر یافت نشد")),
fileUploadPath:joi.allow()    
})

module.exports={
    CreateBlogSchema
}