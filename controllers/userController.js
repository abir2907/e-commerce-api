const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");

  if (!users) {
    throw new CustomError.NotFoundError("No users found");
  }

  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  console.log(req.user);
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new CustomError.BadRequestError("Please provide name and email");
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { name, email },
    { new: true, runValidators: true }
  );

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(
      "Please provide old and new password"
    );
  }

  if (oldPassword === newPassword) {
    throw new CustomError.BadRequestError("Please provide different password");
  }

  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Authentication Error");
  }

  const isPasswordCorrect = await user.comparePasswords(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthorizedError("Invalid Credentials");
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
