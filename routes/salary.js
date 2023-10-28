// external imports
const router = require("express").Router();

// internal imports
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const getSalary = require("../controllers/salary/get");
const createSalary = require("../controllers/salary/create");
const updateStatus = require("../controllers/salary/updateStatus");
const getSingleSalary = require("../controllers/salary/getSingleSalary");
const currentPrevSalaryInfo = require("../controllers/salary/currentPrevSalary");
const currentPrevSalaryInfoAdmin = require("../controllers/salary/usersSalary/usersSalary");

// set router
router.get("/salary", auth, getSalary);
router.get("/salary/:userId", auth, getSingleSalary);
router.get("/current-prev/:id", auth, currentPrevSalaryInfo);
router.get("/digitalgregg/:id", auth, admin, currentPrevSalaryInfoAdmin);
router.post("/salary/create", auth, admin, createSalary);
router.patch("/salary/:salaryId/update", auth, admin, updateStatus);

module.exports = router;
