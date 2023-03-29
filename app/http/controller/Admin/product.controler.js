const { ProductModel } = require("../../models/product");
const { CreateProductschema } = require("../../validations/admin/product.schema");
const path=require("path");
const Controller = require("../controller");
const { DeleteFileInPublic, ListOfImageForRequest, SetFeture, CopyObject, DeleteInvitedPropertyObject } = require("../../../utils/function");
const { objectIdvalidation } = require("../../validations/public.validation");
const HttpStatus=require("http-status");
const createerror = require("http-errors");
const ProductBlackList={
BOOKMARK:"bookmark",
DESLIKE:"deslike",
LIKE:"like",
COMMENTS:"comments",
SUPPLIER:"supplier",  
LENGHT:"lenght",
HEIGHT:"height",
WIDTH:"width",
WEIGHT:"weight"
}
Object.freeze(ProductBlackList)

class ProdutController extends Controller{
async addProduct(req,res,next){
try {
  const productBody = await CreateProductschema.validateAsync(req.body);
  const {title,category,text,short_text,price,count,discount,type}=productBody;
  const supplier=req.user._id;
  const images=ListOfImageForRequest(req?.files||[],req.body.fileUploadPath)

  let feture =SetFeture(req.body);
  const product=await ProductModel.create({title,text,short_text,category,supplier,images,type,feture,count,discount,price})   
  return res.status(HttpStatus.CREATED).json({
    data:{
      statusCode:HttpStatus.CREATED,
      message: "ثبت محصول با موفقیت انجام شد",
      product
    }
  }) 
} catch (error) {
  DeleteFileInPublic(req.body.image)
  next(error)  
}    

} 
async EditProduct(req,res,next){
 try {
const {id}=req.params;
const product=await this.FindProductById(id);  
let data=CopyObject(req.body);
data.images=ListOfImageForRequest(req?.files||[],req.body.fileUploadPath)
data.feture=SetFeture(req.body);
let BlackListFeild=Object.values(ProductBlackList);
DeleteInvitedPropertyObject(data,BlackListFeild)
const EditProduct=await ProductModel.updateOne({_id:product._id},{$set:data});
if(EditProduct.modifiedCount==0) throw {status:HttpStatus.INTERNAL_SERVER_ERROR, message:"خطای داخلی"}
return res.status(HttpStatus.OK).json({ 
data:{
statusCode:HttpStatus.OK,
message:"بروزرسانی انجام شد"  
}
})
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
const search=req?.query?.search || "";
let product;
if(search){
product= await ProductModel.find({
$text:{
  $search:new RegExp(search,"ig")
}
}) 
}else{
  product=await ProductModel.find({})
}
return res.status(HttpStatus.OK).json({
  data:{
    statusCode:HttpStatus.OK,
    product
  }
})                
} catch (error) {
  next(error)  
}    
            
}    
async GetOneProduct(req,res,next){
try {
const {id}=req.params;
const product=await this.FindProductById(id);
return res.status(HttpStatus.OK).json({
statusCode:HttpStatus.OK,
product  
})
                    
} catch (error) {
  next(error)  
}    
                
}    
async RemoveProductById(req,res,next){
  try {
  const {id}=req.params;
  const product=await this.FindProductById(id);
  const removeproduct= await ProductModel.deleteOne({_id:product._id});
  if (removeproduct.deletedCount == 0) throw createerror.InternalServerError("حذف محصول انجام نشد");
  return res.status(HttpStatus.OK).json({
  statusCode:HttpStatus.OK,
  message:"حذف محصول با موفقیت انجام شد" 
  })
                      
  } catch (error) {
    next(error)  
  }    
                  
  }    
async FindProductById(ProductId){
const {id}=await objectIdvalidation.validateAsync({id:ProductId});
const product= await ProductModel.findById(id);
if(!product) throw  new createerror.NotFound("محصولی یافت نشد");
return product
}   
}
module.exports={
ProdutController:new ProdutController()    
}