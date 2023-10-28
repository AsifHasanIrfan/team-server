// external imports
const router = require("express").Router();

// internal imports
const changeOffDayGet = require("../controllers/timeOff/dayOffChnage/get");
const changeOffDayUpdate = require("../controllers/timeOff/dayOffChnage/changeOffDay");
const changeOffDayCreate = require("../controllers/timeOff/dayOffChnage/create");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.get("/change-offday", auth, admin, changeOffDayGet);
router.post("/change-offday", auth, changeOffDayCreate);
router.patch("/change-offday/:user", auth, admin, changeOffDayUpdate);

module.exports = router;
