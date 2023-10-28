// external imports
const router = require("express").Router();

// internal imports
const projectApply = require("../controllers/marketplace/apply");
const getProjectApplyData = require("../controllers/marketplace/getApply");
const UpdateProject = require("../controllers/marketplace/UpdateProject");
const UpdateProposal = require("../controllers/marketplace/updateProposal");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.get("/apply/marketplace", auth, getProjectApplyData);
router.post("/marketplace/apply/:id", auth, projectApply);
router.patch("/proposal/apply/update/:proposalId",  UpdateProposal);
router.patch("/marketplace/update/:projectId", auth, admin, UpdateProject);

module.exports = router;