const express = require("express");
const router = express.Router();

const { login, hello } = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.route("/hello").get(authMiddleware, hello);
router.route("/login").post(login);

module.exports = router;
