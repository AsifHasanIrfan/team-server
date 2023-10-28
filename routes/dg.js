// external imports
const router = require("express").Router();

// internal imports
const createDg = require("../controllers/dg/create");
const getDgsById = require("../controllers/dg/getByUserId");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.post("/dg",auth, admin, createDg);
router.get("/dg/:userId", auth, getDgsById);

module.exports = router;
