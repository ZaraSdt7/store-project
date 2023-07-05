const { graphqlSchemas } = require("../graphql/index.graphql")
function GraphQLConfig(req,res){
return{
schema:graphqlSchemas,
graphiql:true,
context:{req,res}    
}
}
module.exports={
GraphQLConfig
}