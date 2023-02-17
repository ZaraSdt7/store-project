const joi=require("@hapi/joi");
const createHttpError = require("http-errors");
const { mongoIDpattern } = require("../../utils/constans");
const objectIdvalidation=joi.object({
id:joi.string().pattern(mongoIDpattern).error(new Error(createHttpError.BadRequest("شناسه وارد شده صحیح نمی باشد")))    
})
module.exports={
    objectIdvalidation
}