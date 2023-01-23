const Controller = require("../controller");

class ProdutController extends Controller{
addProduct(req,res,next){
try {
    
} catch (error) {
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
GetAllProduct(req,res,next){
try {
                
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
}
module.exports={
ProdutController:new ProdutController()    
}