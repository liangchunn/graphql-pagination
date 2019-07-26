import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './graphql/root.graphql'
import resolvers from './graphql/resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  introspection: true,
})
const app = express()

server.applyMiddleware({ app })

export { app }
