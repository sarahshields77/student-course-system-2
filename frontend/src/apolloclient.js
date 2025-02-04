import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include", // ✅ Needed for auth headers & cookies
  headers: {
    "Content-Type": "application/json", // ✅ Ensure proper JSON format
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
