const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide email and password" });
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(StatusCodes.OK).json({ msg: "User logged in", token });
};

const hello = async (req, res) => {
  res.status(StatusCodes.OK).json({
    msg: `Hello, ${req.user.username}! Welcome! You successfully retrieved your authorized data`,
  });
};

module.exports = {
  login,
  hello,
};
