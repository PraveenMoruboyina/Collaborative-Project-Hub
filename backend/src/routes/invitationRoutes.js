const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
  getInvitations,
  acceptInvitation
} = require("../controllers/invitationController");

const router = express.Router();

router.get("/", authMiddleware, getInvitations);

router.post("/:id/accept", authMiddleware, acceptInvitation);

module.exports = router;
