const joi=require("@hapi/joi");
const createerror=require("http-errors");
const { mongoIDpattern } = require("../../../utils/constans");
const CreateCourseSchema=joi.object({
title:joi.string().min(3).max(30).error(createerror.BadRequest("عنوان دسته بندی صحیح نمی باشد")),
text:joi.string().error(createerror.BadRequest("متن ارسال شده صحیح نمی باشد")),
short_text:joi.string().error(createerror.BadRequest("متن ارسال شده صحیح نمی باشد")),
tags:joi.array().min(0).max(10).error(createerror.BadRequest("برچسب نمی تواندبیشتر از10 تا باشد")),
category:joi.string().regex(mongoIDpattern).error(createerror.BadRequest("دسته بندی موردنظر یافت نشد")),
price:joi.number().error(createerror.BadRequest("قیمت وارد شده صحیح نمی باشد")),
count:joi.number().error(createerror.BadRequest("تعداد وارد شده صحیح نمی باشد")),
discount:joi.number().allow(null,0,"0").error(createerror.BadRequest("تخفیف وارد شده صحیح نمی باشد")),
type:joi.string().regex(/(free|cash|special)/i),
filename:joi.string().pattern(/(\.png|\.jpeg|\.jpg|\.webp|\.gif)$/).error(createerror.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
fileUploadPath:joi.allow()    
})
const CreateEpisodeSchema=joi.object({
    title:joi.string().min(3).max(30).error(createerror.BadRequest("عنوان دسته بندی صحیح نمی باشد")),
    text:joi.string().error(createerror.BadRequest("متن ارسال شده صحیح نمی باشد")),
    type:joi.string().regex(/(lock|unlock)/i),
    chapterID:joi.string().regex(mongoIDpattern).error(createerror.BadRequest("شناسه فصل مورد نظر صحیح نمی باشد")),
    courseID:joi.string().regex(mongoIDpattern).error(createerror.BadRequest("شناسه دوره مورد نظر صحیح نمی باشد")),
    filename:joi.string().pattern(/(\.mp4|\.mkv|\.mpg|\.mov|\.avi)$/).error(createerror.BadRequest("فرمت ویدیوارسال شده صحیح نمی باشد")),
    fileUploadPath:joi.allow()
})
module.exports={
    CreateCourseSchema,
    CreateEpisodeSchema
}