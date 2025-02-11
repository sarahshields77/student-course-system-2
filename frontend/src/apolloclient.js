import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Define the API endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include", // ✅ Needed for auth headers & cookies
  headers: {
    "Content-Type": "application/json", // ✅ Ensure proper JSON format
  },
});

// Attach the token from localStorage to the request headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Initialize the ApolloClient
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
