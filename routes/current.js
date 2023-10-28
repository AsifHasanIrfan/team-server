// external imports
const router = require("express").Router();

// internal imports
const employeeOfTheMonth = require("../controllers/current/employeeOfTheMonth");
const dgCoinThisMonth = require("../controllers/current/dgCoinThisMonthById");
const taskEarnDG = require("../controllers/current/taskDGCurrentPrev");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.get("/task-earn/:id", auth, taskEarnDG);
router.get("/employee-of-the-month", auth, employeeOfTheMonth);
router.get("/dg-coin-this-month/:id", auth, admin, dgCoinThisMonth);

module.exports = router;