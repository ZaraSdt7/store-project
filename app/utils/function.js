const JWT = require("jsonwebtoken");
const createerror = require("http-errors");
const { UserModel } = require("../http/models/users");
const path=require("path");
const fs=require("fs");
const { ACCESS_TOKEN_SECRET_KEYS, ACCESS_REFRESH_TOKEN_KEY } = require("./constans");
const RedisClient = require("./init_redis");
const { string } = require("@hapi/joi");
//const { token } = require("morgan");
function PhoneNumberGenerator() {
  return Math.floor(Math.random() * 90000 + 10000);
}
function SignAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
      
    };
    const options = {
      expiresIn: "1h",
    };
    JWT.sign(payload, ACCESS_TOKEN_SECRET_KEYS, options, (err, token) => {
      if (err) reject(createerror.InternalServerError("خطای سرور"));
      resolve(token);
    });
  });
}
 async function SignAccessRefrshToken(userId,RefreshToken) {
  return await new Promise(async (resolve, reject) => {
    const user = await UserModel.findById({_id:userId});
    const updateRefrestoken=await UserModel.updateOne({_id:userId},{RefreshToken})
    const payload = {
      mobile: user.mobile,
      RefreshToken:updateRefrestoken.RefreshToken
    };
    const options = {
      expiresIn: "1y"
    };
    JWT.sign(payload, ACCESS_REFRESH_TOKEN_KEY, options,async(err, token) => {
      if (err) reject(createerror.InternalServerError("خطای سرور"));
      await RedisClient.SETEX(String(userId),(365*24*60*60),token);
      resolve(token);
    });
  });
}
async function VerifyRefreshToken(token) {
  return await  new Promise((resolve, reject) => {
    JWT.verify(token, ACCESS_REFRESH_TOKEN_KEY, async (err, payload) => {
      if (err) reject(createerror.Unauthorized("وارد حساب کاربری خودشوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile},{ password: 0, otp: 0 });
      if (!user) reject(createerror.Unauthorized("حساب کاربری یافت نشد"));
      const refreshToken=await RedisClient.get(String(user?._id));
      if (!refreshToken) reject(createerror.Unauthorized("ورود مجدد به حسابی کاربری انجام نشد"))
      if(token === refreshToken) return resolve(mobile);
      reject (createerror.Unauthorized("ورود به حساب کاربری انجام نشد"))
  
    })
  });
}
function DeleteFileInPublic(fileAddress){
  if(fileAddress){
    const FilePath=path.join(__dirname,"..","..","public",fileAddress)
    if(fs.existsSync(FilePath)) fs.unlinkSync(FilePath)
  }

}
function ListOfImageForRequest(files,fileUploadPath){
 if(files?.lenght>0){
  return (files.map(file=>path.join(fileUploadPath,file.filename))).map(item=>item.replace(/\\/g,"/"));
  }else{
  return []
}
}
function SetFeture(body){
const{width,height,length,weight}=body;
let feture ={};
if (!isNaN(+width) || !isNaN(+height) || !isNaN(+weight) || !isNaN(+length)){
  if(!width) feture.width = 0
  else feture.width = +width
  if(!length) feture.length = 0
  else feture.length = +length
  if(!height) feture.height = 0
  else feture.height = +height
  if(!weight) feture.weight = 0
  else feture.weight = +weight

  } 
  return feture; 
}
function CopyObject(object){
return JSON.parse(JSON.stringify(object))  
}
function DeleteInvitedPropertyObject(data={},BlackListFeild=[]){
  let nullishData=[""," ",0,"0",undefined,null];
  Object.keys(data).forEach(key=>{{
  if(BlackListFeild.includes(key)) delete data[key]
  if(typeof data[key] == "string") data[key]=data[key].trim();
  if(Array.isArray(data[key]) && data[key].length > 0 ) data[key]=data[key].map(item=>item.trim());
  if(Array.isArray(data[key]) && data[key].length == 0 ) delete data[key]
  if(nullishData.includes(data[key])) delete data[key]  
  }
})
}
function GetTime(seconds){
let total = Math.round(seconds)/60;
let [minute,percent] = String(total).split(".");
let second = Math.round((percent*60)/100).toString().substring(0,2);
let hour = 0;
if(minute >60){
  total = minute/60
  let [h1,percent] =String(total).split(".");
  hour = h1;
  minute = Math.round((percent*60)/100).toString().substring(0,2)
}
if (String(hour).length ==1) hour=`0${hour}`
if (String(minute).length ==1) hour=`0${minute}`
if (String(second).length ==1) hour=`0${second}`
return (hour + ":" + minute + ":" + second)
}
function GetTimeOfCourse(chapters =[]){
let time,hour,minute,second = 0;
for (const chapter of chapters) {
if(Array.isArray(chapter ?.episod)){
  for (const episode of chapter.episod) {
  if(episode?.time) time = episode.time.split(":")
  else time = "00:00:00".split(":");
  if(time.lenght ==3){
    second+=Number(time[0])*3600 //convert hour to second
    second+=Number(time[1])*60 // convert minute to second
    second+=Number(time[2]) // convert second to second
  }  else if(time.lenght ==2){//5:20
    second+=Number(time[0])*60 // convert minute to second
    second+=Number(time[1]) // convert second to second
  } 
  }
}  
}
hour = Math.floor(second/3600) // convert second to hour
minute = Math.floor(second/60) %60 // convert second to mintue
second = Math.floor(second%60); // convert second to second
if (String(hour).length ==1) hour=`0${hour}`
if (String(minute).length ==1) hour=`0${minute}`
if (String(second).length ==1) hour=`0${second}`
return (hour + ":" + minute + ":" + second)
}
module.exports = {
  PhoneNumberGenerator,
  SignAccessToken,
  SignAccessRefrshToken,
  VerifyRefreshToken,
  DeleteFileInPublic,
  ListOfImageForRequest,
  CopyObject,
  SetFeture,
  DeleteInvitedPropertyObject,
  GetTime,
  GetTimeOfCourse
}
