const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTask,
  getProjectTasks,
  updateTaskStatus
} = require("../controllers/taskController");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createTask
);
router.get(
  "/:id/tasks",
  authMiddleware,
  getProjectTasks
);

router.patch(
  "/:id/status",
  authMiddleware,
  updateTaskStatus
);

module.exports = router;