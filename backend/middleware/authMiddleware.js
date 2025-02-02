const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (context) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader) throw new Error("Unauthorized: No token");

  try {
    const token = authHeader.split("Bearer ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    throw new Error("Unauthorized: Invalid token");
  }
};

module.exports = authMiddleware;
