// external imports
const router = require("express").Router();

// internal imports
const createAchievement = require("../controllers/achievement/create");
const getAchievementsById = require("../controllers/achievement/getById");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.post("/achievement", auth, admin, createAchievement);
router.get("/achievement/:userId", auth, getAchievementsById);



module.exports = router;