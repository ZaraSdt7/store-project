const { GraphQLList, GraphQLString } = require("graphql");
const { CourseType } = require("../typeDefs/course.type");
const { CoursetModel } = require("../../http/models/course");

const CourseResolver = {
type: new GraphQLList(CourseType),
args:{
category:{type:GraphQLString}
},
resolve:async(_,args)=>{
const {category} = args;
const findQuery = category ? {category} : {}
return await CoursetModel.find(findQuery).populate([{path:'teacher'},{path:"category"},{path:"comments.user"},{path:"comments.answer.user"},{path:"like"},{path:"deslike"}])   
 
}    
}
module.exports={
    CourseResolver
}