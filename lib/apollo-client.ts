import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: "https://injury-tracker-ten.vercel.app/api/graphql",
  cache: new InMemoryCache(),
})

export default client
