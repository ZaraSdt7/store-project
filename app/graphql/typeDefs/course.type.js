const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const {  UserType, CategoryPublicType } = require("./public.type");
const { CommentType } = require("./comment.type");
const EpisodesType=new GraphQLObjectType({
    name: "EpisodesType",
    fields:{
    _id:{type:GraphQLString},
    title:{type:GraphQLString},
    text:{type:GraphQLString},
    type:{type:GraphQLString},
    time:{type:GraphQLString},
    videoAddress:{type:GraphQLString},
    videoURL:{type:GraphQLString} 
    }
       
})
const ChaptersType=new GraphQLObjectType({
    name: "ChaptersType",
    fields:{
    _id:{type:GraphQLString},
    title:{type:GraphQLString},
    text:{type:GraphQLString},
    episode:{type:new GraphQLList(EpisodesType)}
    }
       
})
  
const CourseType = new GraphQLObjectType({
name : "CourseType",
fields:{
    _id:{type:GraphQLString},
    title:{type:GraphQLString},
    short_text:{type:GraphQLString},
    text:{type:GraphQLString},
    image:{type:GraphQLString},
    imageURL:{type:GraphQLString},
    tags:{type:new GraphQLList(GraphQLString)},
    category:{type:CategoryPublicType},
    price:{type:GraphQLInt},
    discount:{type:GraphQLInt},
    count:{type:GraphQLInt},
    type: {type:GraphQLString},
    status: {type:GraphQLString },
    teacher:{type:UserType},
    chapters:{type:new GraphQLList(ChaptersType)},
    students:{type:UserType},
    comments:{type:new GraphQLList(CommentType)},
    like:{type:new GraphQLList(UserType)},
    deslike:{type:new GraphQLList(UserType)},
    bookmark:{type:new GraphQLList(UserType)} 
}    
})

module.exports={
    CourseType
}