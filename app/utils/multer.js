const multer=require("multer");
const path=require("path");
const fs=require("fs");
const { string } = require("@hapi/joi");

function CreateMulter(){
const date=new Date();
const year=date.getFullYear().toString();
const month=date.getMonth().toString();
const day=date.getDate().toString();
const directory=path.join(__dirname,"..","..","public","uploads","blogs",year,month,day);
fs.mkdirSync(directory,{recursive:true});
return directory
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
    const filePath=CreateMulter();
    cb(null,filePath);
    },
    filename:(req,file,cb)=>{
    const ext=path.extname(file.originalname);
    const fileName=String(new Date().getTime() + ext)
    cb(null,fileName);    
    } 

    })
    const uploadFile=multer({storage});

    module.exports={
        uploadFile
    }