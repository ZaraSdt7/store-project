const { default: mongoose } = require("mongoose");

const PermissionSchema =new mongoose.Schema({
name: {type:String,unique: true},
description:{type:String,default:""}
},{
toJSON:{virtuals:true}
})
module.exports={
    PermissionModel:mongoose.model("permission",PermissionSchema)
}