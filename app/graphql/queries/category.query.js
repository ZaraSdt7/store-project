const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryTypes } = require("../typeDefs/category.type");
const { CategoryModel } = require("../../http/models/categories");

const CategoryResolver = {
type: new GraphQLList(CategoryTypes),  
resolve: async ()=>{
const category = await CategoryModel.find({parent:undefined});
return category    
}
}

const ChildCategoryResolver ={
type: new GraphQLList(CategoryTypes),
args:{
    parent:{type:GraphQLString}
},
resolve: async(_,args)=>{
const {parent} = args;
if(!parent) return {};
const category = await CategoryModel.find({parent})
return category;    
}    
}
module.exports = {
CategoryResolver,
ChildCategoryResolver    
}