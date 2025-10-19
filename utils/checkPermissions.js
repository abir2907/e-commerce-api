const CustomError = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  // If the user making the getSignleUser request is not an admin,
  // Then we don't want that user to see other users using their id
  // Admin can get every user, but the user should only be able to see himself using his id, and not anyone else

  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new CustomError.UnauthorizedError("Not authorized to acess this route");
};

module.exports = checkPermissions;
