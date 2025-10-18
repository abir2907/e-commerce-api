const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    // isTokenValid returns the payload that we signed
    // Remeber, we used a tokenUser as a payload
    // Therefore, we are getting the signed in user in our payload
    const { userName, userId, userRole } = isTokenValid({ token });
    req.user = { userName, userId, userRole };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (req, res, next) => {
  // should only be accessible by admin
  if (req.user.userRole !== "admin") {
    throw new CustomError.UnauthorizedError(
      "Unauthorized to access this route"
    );
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
