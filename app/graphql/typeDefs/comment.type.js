const { GraphQLString, GraphQLObjectType, GraphQLBoolean, GraphQLList } = require("graphql");
const { UserType } = require("./public.type");

const CommentAnswerType = new GraphQLObjectType({
name:"CommentAnswerType",
fields:{
_id:{type:GraphQLString},
user:{type:UserType},
comment:{type:GraphQLString},
craeteAt:{type:GraphQLString},
show:{type:GraphQLBoolean}    
}
})
const CommentType = new GraphQLObjectType({
    name:"CommentType",
    fields:{
    _id:{type:GraphQLString},
    user:{type:UserType},
    comment:{type:GraphQLString},
    craeteAt:{type:GraphQLString},
    show:{type:GraphQLBoolean},
    answer:{type:new GraphQLList(CommentAnswerType)},
    OpenToComment:{type:GraphQLBoolean},
    craeteAt:{type:GraphQLString}    
    }
    })
    module.exports={
        CommentType
    }