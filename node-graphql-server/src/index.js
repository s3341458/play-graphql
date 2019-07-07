const { GraphQLServer } = require('graphql-yoga')

// 2
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}, {
  id: 'link-1',
  url: 'www.howtographql.com1',
  description: 'Fullstack tutorial 1 for GraphQL'
}]

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: () => links,
    link: (parent, args) => {
      filteredLinks = links.filter(l => l.id === args.id)
      return filteredLinks ? filteredLinks[0] : null;
    },
  },
  Mutation: {
    // 2
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      filteredLinks = links.filter(l => l.id === args.id)
      if (filteredLinks) {
        filteredLinks[0].url = args.url ? args.url : filteredLinks[0].url;
        filteredLinks[0].description = args.description ? args.description : filteredLinks[0].description;
        return filteredLinks[0];
      } else {
        return null;
      };
    },
    deleteLink: (parent, args) => {
      filteredLinks = links.filter(l => l.id === args.id)
      links = links.filter(l => l.id !== args.id)
      return filteredLinks ? filteredLinks[0] : null;
    }
  },
  // 3
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
