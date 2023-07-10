const { GraphQLList, GraphQLString } = require("graphql");
const { BlogType } = require("../typeDefs/blog.type");
const { BlogModel } = require("../../http/models/blog");
const path = require("path");


const BlogResolve= {
type:new GraphQLList(BlogType) ,
args:{
    categories:{type:GraphQLString}
},
resolve : async(_,args)=>{
    const {categories} = args;
    const findQuery = categories ? {categories} : {}
    return await BlogModel.find(findQuery).populate([{path:'author'},{path:"categories"},{path:"comments.user"},{path:"comments.answer.user"},{path:"like"},{path:"deslike"},{path:"bookmark"}])
}   
}
module.exports={
    BlogResolve
}