// external imports
const router = require("express").Router();

// internal imports
const createUpdate = require("../controllers/policy/createUpdate");
const getPolicy = require("../controllers/policy/get");
const agreePolicy = require("../controllers/policy/agree");


const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.get("/privacy-policy", auth, getPolicy);
router.patch("/admin-privacy-policy", auth, admin, createUpdate);
router.patch("/privacy-policy/agree/:id", auth, agreePolicy);

module.exports = router;
