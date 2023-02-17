const { ProductModel } = require("../../models/product");
const { CreateProductschema } = require("../../validations/admin/product.schema");
const path=require("path");
const Controller = require("../controller");
const { DeleteFileInPublic, ListOfImageForRequest } = require("../../../utils/function");
const { objectIdvalidation } = require("../../validations/public.validation");
const createHttpError = require("http-errors");

class ProdutController extends Controller{
async addProduct(req,res,next){
try {
  const productBody = await CreateProductschema.validateAsync(req.body);
  const {title,category,text,short_text,price,count,discount,width,height,length,weight}=productBody;
  const supplier=req.user._id;
  const images=ListOfImageForRequest(req?.files||[],req.body.fileUploadPath)

  let feture ={} , type = "pysical";
  if(width || length || height || weight){
  if(!width) feture.width = 0
  else feture.width = width
  if(!length) feture.length = 0
  else feture.length = length
  if(!height) feture.height = 0
  else feture.height = height
  if(!weight) feture.weight = 0
  else feture.weight = weight

  }else{
    type = "virtual"
  }
  const product=await ProductModel.create({title,text,short_text,category,supplier,images,type,feture,count,discount,price})   
  return res.status(200).json({
    data:{
      statusCode:200,
      message: "ثبت محصول با موفقیت انجام شد",
      product
    }
  }) 
} catch (error) {
  DeleteFileInPublic(req.body.image)
  next(error)  
}    

} 
EditProduct(req,res,next){
 try {
        
} catch (error) {
  next(error)  
}    
    
}    
RemoveProduct(req,res,next){
 try {
            
} catch (error) {
  next(error)  
}    
        
}    
async GetAllProduct(req,res,next){
try {
const showProduct= await ProductModel.find({});
return res.status(201).json({
  data:{
    statusCode:201,
    showProduct
  }
})                
} catch (error) {
  next(error)  
}    
            
}    
GetOneProduct(req,res,next){
try {
                    
} catch (error) {
  next(error)  
}    
                
}    
async FindProductById(ProductId){
const {id}=await objectIdvalidation.validateAsync({id:ProductId});
const product= await ProductModel.findById(id);
if(!product) throw createHttpError.NotFound("محصولی یافت نشد");
return product
}   
}
module.exports={
ProdutController:new ProdutController()    
}