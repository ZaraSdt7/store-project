const { default: mongoose } = require("mongoose")

const PaymentSchema=new mongoose.Schema({
InvoiceNumber:{type:String},
authority:{type:String},
paymentDate:{type:Number},
amount:{type:Number},
description:{type:String , default : "Pay for products"},
verify:{type:Boolean ,default:undefined},
user:{type:mongoose.Types.ObjectId , ref:"user"},
bascket:{type:Object , default:{}},
refID:{type:String , default:undefined},
cardHash:{type:String , default:undefined}
},{
    timestamps:true
})
module.exports={
    PaymentModel:mongoose.model("payment",PaymentSchema)
}