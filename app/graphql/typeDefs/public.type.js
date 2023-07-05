const { GraphQLObjectType, GraphQLString, GraphQLScalarType } = require("graphql");
const { ToObject, parseLiteral } = require("../utils");


const AnyType = new GraphQLScalarType({
name:"AnyType",
parseValue: ToObject,
serialize:ToObject,
parseLiteral:parseLiteral 
})
const UserType = new GraphQLObjectType({
name:"UserType",
fields:{
_id:{type:GraphQLString},
frist_name:{type:GraphQLString},
last_name:{type:GraphQLString}    
}    
})
const CategoryPublicType = new GraphQLObjectType({
name:"CategoryType",
fields:{
_id:{type:GraphQLString},
title:{type:GraphQLString}    
}    
})
const ResponsesType = new GraphQLObjectType({
name:"ResponsesType",
fields:{
statusCode:{type:GraphQLString},
data:{type:AnyType}    
}    
})
module.exports={
    UserType,
    CategoryPublicType,
    AnyType,
    ResponsesType
}