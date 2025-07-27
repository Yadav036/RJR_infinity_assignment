const jwt = require("jsonwebtoken");
const JWT_SECRET =  "your-jwt-secret";


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.username; // or decoded.userId if you store _id
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" });
  }
};

module.exports = { authMiddleware };