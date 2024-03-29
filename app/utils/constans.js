module.exports={
    mongoIDpattern:/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    
    ROLES:Object.freeze({
    USER:"USER",
    ADMIN:"ADMIN",
    WRITER:"WRITER",
    TEACHER:"TEACHER",
    SUPPLIER:"SUPPLIER"
    }),
    PERMISSIONS:Object.freeze({
    USER:["profile"],
    ADMIN:["all"],
    SUPERADMIN:["all"],
    CONTENT_MANAGER:["course","blog","category","product"],
    TEACHER:["course","blog"],
    SUPPLIER:["product"],
    ALL:"all"    
    }),

    ACCESS_TOKEN_SECRET_KEYS:"196DE59AC33D440D1B6348B0D06A426B6C6AFBBA872EE97AC161933AFE6F0430",
   ACCESS_REFRESH_TOKEN_KEY:"404FF76F99F819BA48641D1C5F2B639FAB1FD65097F42E8D5B0C8065FBFA76EA"
   

} 
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM2MzA5NjE3MCIsImlhdCI6MTY2NjU1MTk1NywiZXhwIjoxNjY2NTU1NTU3fQ.10i0li9ETC0NAC7Gwtczkx5vPwBi-9l880dKyHyo5v8"