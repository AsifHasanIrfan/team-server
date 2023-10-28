// external imports
const router = require("express").Router();

// internal imports
const getJobs = require("../controllers/job/get");
const createJob = require("../controllers/job/create");
const updateStatus = require("../controllers/job/updateStatus");


const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.get("/job", getJobs);
router.post("/job", auth, admin, createJob);
router.patch("/job/:jobId/update", auth, admin, updateStatus);


module.exports = router;
