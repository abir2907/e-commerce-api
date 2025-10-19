const CustomError = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  // This function checks if either the user making this request
  // is an admin or if the requesting user and the resource user
  // are the same, in both cases it is safe so we return
  // In other case we throw unauthorized error, since other user
  // should not be able to access some other user's resources

  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new CustomError.UnauthorizedError("Not authorized to acess this route");
};

module.exports = checkPermissions;
