import { ApiError } from "../exceptions/exceptions.js";
import tokenService from "../service/token-service.js";
import { decodeData } from "../utils/hash-password.js";
export const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    if (!req.headers.authorization) throw ApiError.UnauthorizedError();
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw ApiError.UnauthorizedError();
    const userData = tokenService.validateAccessToken(token);
    if (!userData) throw ApiError.UnauthorizedError();
    req.user = userData;
    next();
  } catch (error) {
    throw ApiError.UnauthorizedError();
  }
};

export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) return res.status(403).json("User not authorized");
      const { roles: userRoles } = decodeData(token);
      if (!userRoles.some((role) => roles.includes(role)))
        return res.status(403).json("User do not have access rights");
      next();
    } catch (error) {
      res.status(403).json("User not authorized");
    }
  };
};
