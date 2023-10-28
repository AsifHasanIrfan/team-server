// external imports
const router = require("express").Router();

// internal imports
const createTask = require("../controllers/tasks/create");
const updateStatus = require("../controllers/tasks/updateStatus");
const updateAdmin = require("../controllers/tasks/updateAdmin");
const getTask = require("../controllers/tasks/tasks");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.get("/task/get-task", auth, admin, getTask);
router.post("/task/create-task/:userId", auth, createTask);

router.put("/task/update-task-status/:taskId", auth, updateStatus);
router.put("/task/update-task-admin/:taskId", auth, admin, updateAdmin);

module.exports = router;