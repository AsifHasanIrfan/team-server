// external imports
const router = require("express").Router();

// internal imports
const auth = require("../middleware/auth");
const signup = require("../controllers/auth/signup");
const signin = require("../controllers/auth/signin");
const genarateToken = require("../controllers/auth/genarateToken");
const forgetPassword = require("../controllers/auth/forgetPassword");

// set router
router.post("/signup", auth, signup);
router.post("/signin", signin);
router.post("/forget-password", forgetPassword);
router.post("/refresh-token", genarateToken);

module.exports = router;
