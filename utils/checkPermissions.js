const CustomError = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  // If the user making the getSignleUser request is not an admin,
  // Then we don't want that user to see other users using their id
  // Admin can get every user, but the user should only be able to see himself using his id, and not anyone else
  console.log(`RequestUserId: ${requestUser.userId}`);
  console.log(`ResourceUserId: ${resourceUserId}`);
  console.log(`Type of requestUserId: ${typeof requestUser.userId}`);
  console.log(`Type of resourceUserId: ${typeof resourceUserId}`);
  // Sample log:
  /* 
     RequestUserId: 68f34a1eae9576f644d10841
     ResourceUserId: 68f395cac6ce9da0b85eef3d
     Type of requestUserId: string
     Type of resourceUserId: object

     Notice that the user ids are different, therefore someone else is trying to access some other user. It it's admin, it's ok, but if it's a user, then we should throw an error

     Also notice that the type of req.user.userId is String but 
     user._id is object
  */
};

module.exports = checkPermissions;
