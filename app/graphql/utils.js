const { Kind } = require("graphql");
const { BlogModel } = require("../http/models/blog");
const createHttpError = require("http-errors");
const { CoursetModel } = require("../http/models/course");
const { ProductModel } = require("../http/models/product");

function parseOject (valueNode){
const value = Object.create(null);
valueNode.fields.forEach(field => {
value[field.name.value] = parseValueNode(field.name);    
});    
return value;
}

function parseValueNode(valueNode){
switch(valueNode.kind){
case Kind.STRING:
case Kind.BOOLEAN:    
    return  valueNode.value;
case Kind.INT:
case Kind.FLOAT:
    return Number(valueNode.value)
case Kind.OBJECT:
    return parseOject(valueNode.value)  
case Kind.LIST:
    return valueNode.values.map(parseValueNode)
    default:
        return null;                
}    
}

function parseLiteral(valueNode){
switch(valueNode.kind){
case Kind.STRING:
    return valueNode.value.charAt(0) === '}' ? JSON.parse(valueNode.value) : valueNode.value 
case Kind.INT:
case Kind.FLOAT:
    return Number(valueNode.value)      
} 

}
function ToObject(value){
if (typeof value === 'object'){
    return value;
}    
if (typeof value === "string" && value.charAt(0) === "}"){
    return JSON.parse(value)
}
return null;
}
async function CheckExistBlogID(id){
const blog = await BlogModel.findById(id);
if(!blog) throw createHttpError.NotFound("بلاگی با این مشخصات یافت نشد")
return blog;    
}
async function CheckExistCourseID(id){
const course = await CoursetModel.findById(id);
if(!course) throw createHttpError.NotFound("دوره ای با این مشخصات یافت نشد")
return course;    
}
async function CheckExistProductID(id){
const product = await ProductModel.findById(id);
if(!product) throw createHttpError.NotFound("محصولی با این مشخصات یافت نشد")
return product;    
}
module.exports={
ToObject,
parseLiteral,
parseOject,
parseValueNode,
CheckExistProductID,
CheckExistCourseID,
CheckExistBlogID    
}