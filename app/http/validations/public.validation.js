const joi=require("@hapi/joi");
const { mongoIDpattern } = require("../../utils/constans");
const createHttpError = require("http-errors");
const objectIdvalidation=joi.object({
    id : joi.string().pattern(mongoIDpattern).error(createHttpError.BadRequest(new createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد")))   
})
module.exports={
    objectIdvalidation
}