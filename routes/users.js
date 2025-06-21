var express = require("express");
const { login, signup } = require("../controllers/user");
const { validateRegister, validateLogin } = require("../middlewares/user");
var router = express.Router();

// Register
router.post("/register", validateRegister, signup);

//Login
router.post("/login", validateLogin, login);


module.exports = router;
