// external imports
const router = require("express").Router();

// internal imports
const auth = require("../middleware/auth");

const getMembers = require("../controllers/auth/accessUser/members");

// set router
router.get("/members", auth, getMembers);


module.exports = router;