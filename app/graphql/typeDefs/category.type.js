const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { AnyType } = require("./public.type");

const CategoryTypes = new GraphQLObjectType({
name:"CategoryTypes",
fields:{
_id:{type:GraphQLString},
title:{type:GraphQLString},
children:{type:new GraphQLList(AnyType)}    
}    
})
module.exports={
    CategoryTypes
}