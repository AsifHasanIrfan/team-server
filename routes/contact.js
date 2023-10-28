// external imports
const router = require("express").Router();

// internal imports
const getContact = require("../controllers/contact/get");
const createContact = require("../controllers/contact/create");


const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// set router
router.get("/contact", auth, admin, getContact);
router.post("/contact", createContact);


module.exports = router;
