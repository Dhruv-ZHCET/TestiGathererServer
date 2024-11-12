import jwt from "jsonwebtoken";
import JWT_SECRET from "./config.js";

const AuthMiddleware = (req, res, next) => {
  try {
    // Check for authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Authorization required",
        message: "No authorization header provided",
      });
    }

    // Validate header format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Invalid authorization format",
        message: "Authorization header must start with 'Bearer '",
      });
    }

    // Extract and verify token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Token required",
        message: "No token provided in authorization header",
      });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Ensure required claims are present
    if (!decoded.email || !decoded.firstname) {
      return res.status(401).json({
        error: "Invalid token",
        message: "Token missing required claims",
      });
    }

    (req.email = decoded.email), (req.firstname = decoded.firstname), next();
  } catch (error) {
    // Handle different types of JWT errors
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: "Token expired",
        message: "Your session has expired. Please log in again.",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        error: "Invalid token",
        message: "Token verification failed",
      });
    }

    // Handle unexpected errors
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({
      error: "Authentication error",
      message: "An unexpected error occurred during authentication",
    });
  }
};

export default AuthMiddleware;
