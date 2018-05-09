const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    users: (root, args, context, info) => {
        return context.db.query.users({}, info)
      },
  },
  Mutation: {
    createUser: (root, args, context, info) => {
      return context.db.mutation.createUser({
        data: {
          name: args.name
        },
      }, info)
    },
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'generate/prisma.graphql',
      endpoint: 'http://localhost:4466',
      secret: 'ddaaww',
      debug: true,
    }),
  }),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))