// external imports
const router = require("express").Router();

// internal imports
const getTimeOff = require("../controllers/timeOff/get");
const getTimeOffById = require("../controllers/timeOff/getById");
const createTimeOffInMins = require("../controllers/timeOff/timeoffInMins/create");
const updateStatus = require("../controllers/timeOff/timeoffInMins/update");
const updateTimeoffDay = require("../controllers/timeOff/updateTimeoffDay");
const updateTimeoffDayInMins = require("../controllers/timeOff/purchaseInMins/purchaseInMins");
const deleteTimeOff = require("../controllers/timeOff/deleteTimeOff");
const trade = require("../controllers/timeOff/trade");
const tradeInMins = require("../controllers/timeOff/tradeInMins/tradeInMins");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.get("/timeoff", auth, admin, getTimeOff);
router.get("/timeoff/:id", auth, getTimeOffById);
router.post("/timeoff/create", auth, createTimeOffInMins);
router.patch("/timeoff/:timeOffId/update", auth, admin, updateStatus);
// router.patch("/timeoff/purchase/:id", auth, updateTimeoffDayInMins);
router.delete("/timeoff/:timeOffId/delete", auth, deleteTimeOff);
// router.patch("/trade/:id", auth, tradeInMins);

module.exports = router;
