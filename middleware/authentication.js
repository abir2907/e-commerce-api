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
    const payload = isTokenValid({ token });
    console.log(payload);
    /* Sampple log: 
      (below are the details of the logged in user accessing our route)
      {
        userId: '68f34a1eae9576f644d10841',
        userName: 'steve', 
        userRole: 'user',
        iat: 1760795227,
        exp: 1763387227
      }
    */
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = {
  authenticateUser,
};
