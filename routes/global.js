// external imports
const router = require("express").Router();

// internal imports
const globalUpdateTimeoffInMins = require("../controllers/global/updateTimeoffMins");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.patch("/global/update/timeoff/mins", auth, admin, globalUpdateTimeoffInMins);

module.exports = router;
