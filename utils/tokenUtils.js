import jwt from "jsonwebtoken";

export const createJwt = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
