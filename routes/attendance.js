// external imports
const router = require("express").Router();

// internal imports
const createAttendance = require("../controllers/attendance/create");
const getAttendance = require("../controllers/attendance/get");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.get("/attendance", auth, admin, getAttendance);
router.post("/attendance", auth, createAttendance);

module.exports = router;
