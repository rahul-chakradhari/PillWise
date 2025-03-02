// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  const token = req.cookies?.token || req.headers?.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export { verifyUser };
