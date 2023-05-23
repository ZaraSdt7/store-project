const joi=require("@hapi/joi");
const { mongoIDpattern } = require("../../../utils/constans");
const createHttpError = require("http-errors");
const RoleSchema=joi.object({
title:joi.string().min(5).max(13).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمی باشد")),
description:joi.string().min(0).max(100).error(createHttpError.BadRequest("عنوان دسته بندی توضیحات صحیح نمی باشد")),
permissions:joi.array().items(joi.string().pattern(mongoIDpattern)).error(createHttpError.BadRequest("عنوان دسترسی ارسال شده صحیح نمی باشد"))
})
const PermissionSchema=joi.object({
name:joi.string().min(5).max(13).error(createHttpError.BadRequest("نام دسته بندی صحیح نمی باشد")),
description:joi.string().min(0).max(100).error(createHttpError.BadRequest("عنوان دسته بندی توضیحات صحیح نمی باشد"))
})
module.exports={
RoleSchema,
PermissionSchema    
}