// external imports
const router = require("express").Router();

// internal imports
const createReport = require("../controllers/report/create");
const getReports = require("../controllers/report/get");


const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.get("/reports", auth, admin, getReports);
router.post("/report", auth, createReport);

module.exports = router;