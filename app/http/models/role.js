const { default: mongoose } = require("mongoose");

const RoleSchema =new mongoose.Schema({
title: {type:String,unique: true},
permissions:{type:[mongoose.Types.ObjectId],ref:'permissions',default:[]}
},{
toJSON:{virtuals:true}
})
module.exports={
    RoleModel:mongoose.Model("role",RoleSchema)
}