import { Resolvers } from '../generated/graphql'
import { getMessages } from '../models/messages'

const resolvers: Resolvers = {
  Query: {
    messages: (_, { cursor, limit }) => getMessages(limit, cursor),
  },
}

export default resolvers
