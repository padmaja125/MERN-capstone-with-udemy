export const authenticateCheck = async (req, res, next) => {
  console.log("auth middleware");
  next();
};
