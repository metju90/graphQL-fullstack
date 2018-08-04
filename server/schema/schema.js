/*

 Schema contains all the data graphQL needs

 */


const _ = require('lodash');
const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQueryType = require('./root_query_type');
const mutations = require('./mutations');

// GraphQLSchema takes a rootQuery and returns a graphQLSchema
module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});
