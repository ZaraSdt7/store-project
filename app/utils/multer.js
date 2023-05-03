const multer=require("multer");
const path=require("path");
const fs=require("fs");
const createerror=require("http-errors");
const { string } = require("@hapi/joi");

function CreateMulter(req){
const date=new Date();
const year=date.getFullYear().toString();
const month=date.getMonth().toString();
const day=date.getDate().toString();
const directory=path.join(__dirname,"..","..","public","uploads","blogs",year,month,day);
req.body.fileUploadPath=path.join("uploads","blogs",year,month,day);
fs.mkdirSync(directory,{recursive:true});
return directory
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
    if(file?.originalname){
    const filePath=CreateMulter(req);
    return cb(null,filePath);
    }    
    cb(null,null)
    },
    filename:(req,file,cb)=>{
    if(file.originalname){
    const ext=path.extname(file.originalname);
    const fileName=String(new Date().getTime() + ext)
    req.body.filename=fileName;
    return cb(null,fileName);  
    }
    cb(null,null)
    } 

    })
    function fileFilter(req,file,cb){
    const ext=path.extname(file.originalname);
    const mimetype=[".jpg",".jpeg",".gif",".webp",".png"];
    if(mimetype.includes(ext)){
        return cb(null,true)
    }
    return cb(createerror.BadRequest("فرمت ارسال شده صحیح نمی باشد"));    
    }
    function videoFilter(req,file,cb){
        const ext=path.extname(file.originalname);
        const mimetype=[".mp4",".mov",".mkv",".mpg",".avi"];
        if(mimetype.includes(ext)){
            return cb(null,true)
        }
        return cb(createerror.BadRequest("فرمت ویدیو ارسال شده صحیح نمیباشد"));    
        }
    const imagesize=1*1000*1000;
    const videosize= 300*1000*1000;//300mb
    const uploadFile=multer({storage,fileFilter,limits:{fieldSize:imagesize}});
    const uploadvideo=multer({storage,videoFilter,limits:{fieldSize:videosize}});


    module.exports={
        uploadFile,
        uploadvideo
    }