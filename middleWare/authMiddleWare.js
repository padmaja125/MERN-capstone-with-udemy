import { UnauthorizedError } from "../errors/customErrors.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authenticateCheck = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { userId, role } = verifyToken(token);
    req.user = { userId, role };

    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnauthorizedError("unauthorized to enter");
    next();
  };
};
