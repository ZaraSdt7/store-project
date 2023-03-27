const joi=require("@hapi/joi");
const createerror = require("http-errors");
const { mongoIDpattern } = require("../../utils/constans");
const objectIdvalidation=joi.object({
id:joi.string().pattern(mongoIDpattern).error(createerror.BadRequest("شناسه وارد شده صحیح نمیباشد"))   
})
module.exports={
    objectIdvalidation
}