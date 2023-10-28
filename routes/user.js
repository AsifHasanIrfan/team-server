// external imports
const router = require("express").Router();

// internal imports
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const users = require("../controllers/auth/users");
const AdminUsersWithPopulateAllData = require("../controllers/auth/usersAdmin");
const updateUser = require("../controllers/auth/updateUser");
const updateBio = require("../controllers/auth/updateBio");
const singleUser = require("../controllers/auth/singleUser");
const updateArchived = require("../controllers/auth/updateArchived");
const updatePayment = require("../controllers/salary/updatePayment");
const getPaymentById = require("../controllers/payments/getById");
const createDrawback = require("../controllers/drawback/createDrawback");
const getDrawback = require("../controllers/drawback/getDrawbacks");
const updateApprove = require("../controllers/auth/updateApprove");
const userProfile = require("../controllers/auth/userProfile");
// this for method [ex: bkash/bank and number]
const updatePaymentInformation = require("../controllers/auth/updatePaymentInfo");
const updateProfilePic = require("../controllers/auth/updateProfilePic");
const updateTeamLeader= require("../controllers/auth/updateWorkingAs");

// set router
router.get("/users", auth, admin, users);
router.get("/admin/users", auth, admin, AdminUsersWithPopulateAllData);
router.get("/user/:userId", auth, singleUser);

// payments
router.get("/user/payment/:id", auth, getPaymentById);
router.post("/user/update-payment/:id", auth, admin, updatePayment);
 
// drawbacks
router.get("/user/drawback/:id", auth, getDrawback);
router.post("/user/drawback/:id", auth, admin, createDrawback);

router.put("/user/update-user/:id", auth, updateUser);
router.patch("/user/update/profile/:id", auth, admin, userProfile);
router.put("/user/update-approve/:id", auth, admin, updateApprove);
router.patch("/user/:userId/leader", auth, updateTeamLeader);
router.patch("/user/:userId/update-bio", auth, updateBio);
router.patch("/user/:userId/update-archived", auth, admin, updateArchived);
router.patch("/user/:userId/update-payment", auth, updatePaymentInformation);
router.patch("/user/update-profile-photo/:id", auth, updateProfilePic);

module.exports = router;