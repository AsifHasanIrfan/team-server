// external imports
const router = require("express").Router();

// internal imports
const auth = require('../middleware/auth')

const createNotification = require("../controllers/notification/create")
const archiveNotification = require("../controllers/notification/archive")
const getNotification = require("../controllers/notification/get")
const isReadNotification = require("../controllers/notification/isRead")
const unreadAllNotification = require("../controllers/notification/unreadAll")
const readAllNotification = require("../controllers/notification/readAll")
const archiveAllNotification = require("../controllers/notification/archiveAll")
const unreadNotification = require("../controllers/notification/unread")

// set router
router.get("/notification", auth, getNotification);
router.post("/notification/create", createNotification);

router.patch("/notification/isRead/:id", auth, isReadNotification);
router.patch("/notification/archive/:id", auth, archiveNotification);
router.patch("/notification/unreadAll", auth, unreadAllNotification);
router.patch("/notification/readAll", auth, readAllNotification);
router.patch("/notification/archiveAll", auth, archiveAllNotification);
router.patch("/notification/unread/:id", auth, unreadNotification);

module.exports = router;