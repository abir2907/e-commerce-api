const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const registerController = async (req, res) => {
  const { email } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const loginController = async (req, res) => {
  res.send("Login User");
};

const logoutController = async (req, res) => {
  res.send("Logout User");
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
