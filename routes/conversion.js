// external imports
const router = require("express").Router();

// internal imports
const getConversion = require("../controllers/conversion/get");
const updateConversion = require("../controllers/conversion/update");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.get("/conversion", auth, getConversion);
router.patch("/conversion/:id", auth, admin, updateConversion);

module.exports = router;