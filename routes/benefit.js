// external imports
const router = require("express").Router();

// internal imports
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const createBenefit = require("../controllers/benefit/create");
const getBenefits = require("../controllers/benefit/get");
const getUsersBenefits = require("../controllers/benefit/users/get");
const assignBenefit = require("../controllers/benefit/assign");
const getAssignBenefits = require("../controllers/benefit/getAssigned");
const updateBenefit = require("../controllers/benefit/updateBenefit");
const purchasedBenefit = require("../controllers/benefit/purchasedBenefit");
const deleteBenefit = require("../controllers/benefit/deleteBenefit");
const getBenefitHistories = require("../controllers/benefitHistory/histories");
const removeBenefitHistories = require("../controllers/benefitHistory/remove");

// set router
router.get("/benefit", auth, admin, getBenefits);
router.get("/user/benefit", auth, getUsersBenefits);
router.get("/benefit/histories", auth, admin, getBenefitHistories);

router.post("/benefit", auth, admin, createBenefit);
router.post("/benefit/purchase", auth, purchasedBenefit);
router.post("/benefit/assign", auth, admin, assignBenefit);
router.put("/benefit/update-benefit/:benefitId", auth, admin, updateBenefit);
router.put(
  "/benefit/remove/histories/:benefitHistoryId",
  auth,
  admin,
  removeBenefitHistories
);

router.get("/benefit/assigned", auth, admin, getAssignBenefits);
router.post("/benefit/assign", auth, admin, assignBenefit);
router.delete("/benefit/delete/:benefitId", auth, admin, deleteBenefit);


module.exports = router;