const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { UserType, CategoryType, CategoryPublicType } = require("./public.type");
const { CommentType } = require("./comment.type");

const BlogType=new GraphQLObjectType({
    name:"BlogType",
    fields:{
    _id:{type:GraphQLString},
    author:{type:UserType},
    title:{type:GraphQLString},
    text:{type:GraphQLString},
    short_text:{type:GraphQLString},
    image:{type:GraphQLString},
    tags:{type:new GraphQLList(GraphQLString)},
    categories:{type:CategoryPublicType},
    comments:{type:new GraphQLList(CommentType)},
    like:{type:new GraphQLList(UserType)},
    deslike:{type:new GraphQLList(UserType)},
    bookmark:{type:new GraphQLList(UserType)}    
    }
    
})
module.exports={
    BlogType
}