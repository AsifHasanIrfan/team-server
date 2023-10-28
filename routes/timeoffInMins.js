// external imports
const router = require("express").Router();

// internal imports
const addDays = require("../controllers/timeoffInMins/addDays");
const timeoffDrawback = require("../controllers/timeoffInMins/drawbackTimeoff");


const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.patch("/add-days/:id", auth, admin, addDays);
router.patch("/days-drawback/:id", auth, admin, timeoffDrawback);

module.exports = router;
