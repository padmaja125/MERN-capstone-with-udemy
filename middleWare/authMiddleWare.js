import { UnauthorizedError, BadRequestError } from "../errors/customErrors.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authenticateCheck = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { userId, role } = verifyToken(token);
    console.log(userId);
    const testUser = userId === "65ef1e9794641e95222d58c7";
    req.user = { userId, role, testUser };

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

// test user check
export const testUserCheck = (req, res, next) => {
  console.log("testUserCheck", req.user);
  if (req.user.testUser) throw new BadRequestError("Test User. Demo only");
  next();
};
