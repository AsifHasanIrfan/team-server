// external imports
const router = require("express").Router();

// internal imports
const getMarketplaceJobs = require("../controllers/marketplace/get");
const createMarketplaceJob = require("../controllers/marketplace/create");
const getMarketplaceJobById = require("../controllers/marketplace/single");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const UpdateProject = require("../controllers/marketplace/UpdateProject");
const UpdateApply = require("../controllers/marketplace/UpdateApply");

// set router
router.get("/marketplace", auth, getMarketplaceJobs);
router.get("/marketplace/:id", auth, getMarketplaceJobById);
router.post("/marketplace", auth, admin, createMarketplaceJob);
router.patch("/marketplace/update/:projectId", auth, admin, UpdateProject);
router.patch("/proposal/update/:proposalId", auth, admin, UpdateApply);

module.exports = router;