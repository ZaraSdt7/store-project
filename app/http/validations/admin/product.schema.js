const joi=require("@hapi/joi");
const createerror=require("http-errors");
const { mongoIDpattern } = require("../../../utils/constans");
const CreateProductschema=joi.object({
title:joi.string().min(3).max(30).error(createerror.BadRequest("عنوان دسته بندی صحیح نمی باشد")),
text:joi.string().error(createerror.BadRequest("متن ارسال شده صحیح نمی باشد")),
short_text:joi.string().error(createerror.BadRequest("متن ارسال شده صحیح نمی باشد")),
tags:joi.array().min(0).max(10).error(createerror.BadRequest("برچسب نمی تواندبیشتر از 5 تا باشد")),
category:joi.string().regex(mongoIDpattern).error(createerror.BadRequest("دسته بندی موردنظر یافت نشد")),
price:joi.number().error(createerror.BadRequest("قیمت وارد شده صحیح نمی باشد")),
count:joi.number().error(createerror.BadRequest("تعداد وارد شده صحیح نمی باشد")),
discount:joi.number().allow(null,0,"0").error(createerror.BadRequest("تخفیف وارد شده صحیح نمی باشد")),
weight:joi.number().allow(null,0,"0").error(createerror.BadRequest("وزن وارد شده صحیح نمی باشد")),
length:joi.number().allow(null,0,"0").error(createerror.BadRequest("طول وارد شده صحیح نمی باشد")),
height:joi.number().allow(null,0,"0").error(createerror.BadRequest("ارتفاع وارد شده صحیح نمی باشد")),
width:joi.number().allow(null,0,"0").error(createerror.BadRequest("عرض وارد شده صحیح نمی باشد")),
type:joi.string().regex(/(virtual|phisical)/i),
filename:joi.string().pattern(/(\.png|\.jpeg|\.jpg|\.webp|\.gif)$/).error(createerror.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
fileUploadPath:joi.allow()    
})

module.exports={
    CreateProductschema
}