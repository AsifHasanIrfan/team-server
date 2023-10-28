// external imports
const router = require("express").Router();

// internal imports
const getForgetPasswordRequest = require("../controllers/forgetPassword/get");
const updateForgetPasswordRequest = require("../controllers/forgetPassword/update");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.get("/forget-password", auth, admin, getForgetPasswordRequest);
router.patch("/forget-password/:requestId/update", updateForgetPasswordRequest);
// router.patch("/forget-password/:requestId/update", auth, admin, updateForgetPasswordRequest);

module.exports = router;
