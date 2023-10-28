// external imports
const router = require("express").Router();

// internal imports
const getLoginRequests = require("../controllers/requestLogin/getRequests");
const createLoginRequests = require("../controllers/requestLogin/request");
const deleteLoginRequest = require("../controllers/requestLogin/delete");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.get("/request-login", auth, admin, getLoginRequests);
router.post("/request-login", createLoginRequests);
router.delete("/request-login/:id", auth, admin, deleteLoginRequest);

module.exports = router;
