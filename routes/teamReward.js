// external imports
const router = require("express").Router();

// internal imports
const getTeamMemberRewardDrawback = require("../controllers/teamReawd/get");
const updateTeamMemberRewardDrawback = require("../controllers/teamReawd/update");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
// router.get("/task/get-task", auth, admin, getTask);
router.get("/team-member/rewards-drawback", auth, getTeamMemberRewardDrawback);
router.patch("/team-member/rewards-drawback", auth, admin, updateTeamMemberRewardDrawback);

module.exports = router;