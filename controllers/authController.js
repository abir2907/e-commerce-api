const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  // This will be the payload of our jwt token
  const tokenUser = {
    userId: user._id,
    userName: user.name,
    userRole: user.role,
  };

  const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
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
