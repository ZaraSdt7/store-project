const { GraphQLList, GraphQLString, GraphQLInt, GraphQLObjectType } = require("graphql")
const { UserType, CategoryPublicType } = require("./public.type")
const { CategoryType } = require("./public.type")
const { CommentType } = require("./comment.type")
const FetureType= new GraphQLObjectType({
name:"FetureType",
fields:{
    length:{type:GraphQLString},
    height:{type:GraphQLString},
    width:{type:GraphQLString},
    weight:{type:GraphQLString},
    color:{type:new GraphQLList(GraphQLString)},
    model:{type:new GraphQLList(GraphQLString)},
    madein:{type:GraphQLString}
}    
})
const ProductType=new GraphQLObjectType({
    name:"ProductType",
    fields:{
    _id:{type:GraphQLString},
    supplier:{type:UserType},
    title:{type:GraphQLString},
    text:{type:GraphQLString},
    short_text:{type:GraphQLString},
    images:{type:GraphQLString},
    imageURL:{type:new GraphQLList(GraphQLString)},
    tags:{type:new GraphQLList(GraphQLString)},
    category:{type:CategoryPublicType},
    price:{type:GraphQLInt},
   discount:{type:GraphQLInt},
   count:{type:GraphQLInt},
   type:{type:GraphQLString},
   feture:{type:FetureType},
   comments:{type:new GraphQLList(CommentType)},
    like:{type:new GraphQLList(UserType)},
    deslike:{type:new GraphQLList(UserType)},
    bookmark:{type:new GraphQLList(UserType)}    
    }
})
module.exports={
ProductType
}