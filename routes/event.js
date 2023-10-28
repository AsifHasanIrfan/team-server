// external imports
const router = require("express").Router();

// internal imports
const createEvent = require("../controllers/event/create")
const getEvent = require("../controllers/event/events")
const auth = require("../middleware/auth");

// set router
router.get("/events", auth, getEvent);
router.post("/event/create", auth, createEvent);

module.exports = router;