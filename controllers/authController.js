const registerController = async (req, res) => {
  res.send("Register User");
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
