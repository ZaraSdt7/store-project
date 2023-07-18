const {GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLString} = require("graphql")
const { BlogResolve } = require("./queries/blog.query")
const { ProductResolver } = require("./queries/product.query")
const { CategoryResolver, ChildCategoryResolver } = require("./queries/category.query")
const { CourseResolver } = require("./queries/course.query")
const { CommentBlogMutation, CommentCourseMutation,  CommentProductMutation} = require("./mutations/comment.mutation")
const {LikesProduct,LikesBlogs,LikesCourse} = require("./mutations/likesmutation")
const { DeLikesProduct, DesLikeCourse, DesLikeBlog} = require("./mutations/deslikesmutation")
const { GetUserBookmarkBlogs,GetUserBookmarkCourse,GetUserBookmarkProduct} = require("./queries/user-profile")
const {CourseBookmark,BlogBookmark,ProductBookmark} = require("./mutations/bookmark.mutation")
const { AddProductBascket,AddCourseBascket,RemoveCourseBascket,RemoveProductBascket } = require("./mutations/bascket.mutation")
const RootQuery = new GraphQLObjectType({
name: "RootQuery",
fields:{
    blogs :BlogResolve,   
    products:ProductResolver,
    categoriess: CategoryResolver,
    childcategories:ChildCategoryResolver,
    courses:CourseResolver,
    GetUserBookmarkBlogs,
    GetUserBookmarkCourse,
    GetUserBookmarkProduct
}  
})    
const Mutation = new GraphQLObjectType({
name: "Mutation",
fields:{
    CommentBlogMutation,
    CommentCourseMutation,
    CommentProductMutation,
    LikesProduct,
    LikesBlogs,
    LikesCourse,
    DeLikesProduct,
    DesLikeCourse,
    DesLikeBlog,
    CourseBookmark,
    BlogBookmark,
    ProductBookmark,
    AddProductBascket,
    AddCourseBascket,
    RemoveCourseBascket,
    RemoveProductBascket
    
}    
})

const graphqlSchemas = new GraphQLSchema({
query:RootQuery,
mutation:Mutation    
})
module.exports={
    graphqlSchemas
}