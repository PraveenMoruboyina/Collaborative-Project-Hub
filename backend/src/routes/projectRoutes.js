const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProject,
  getMyProjects,
  getProjectById,
  getProjectMembers
} = require("../controllers/projectController");
const {
  createInvitation,
  acceptInvitation
} = require("../controllers/invitationController");
const {
  getProjectTasks
} = require("../controllers/taskController");
const router = express.Router();


router.post(
  "/",
  authMiddleware,
  createProject
);
router.get(
  "/",
  authMiddleware,
  getMyProjects
);
router.get(
  "/:id",
  authMiddleware,
  getProjectById
);
router.post(
  "/:id/invite",
  authMiddleware,
  createInvitation
);
router.post(
  "/:id/accept",
  authMiddleware,
  acceptInvitation
);
router.get(
  "/:id/tasks",
  authMiddleware,
  getProjectTasks
);
router.get(
  "/:id/members",
  authMiddleware,
  getProjectMembers
);

module.exports = router;