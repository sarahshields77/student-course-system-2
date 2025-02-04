require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true, 
};
app.use(cors(corsOptions));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), 
});

async function startServer() {
  await server.start();

  server.applyMiddleware({
    app,
    cors: corsOptions,
  });

  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("🚀 MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
