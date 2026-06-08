const prisma = require("../config/db");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const projectsOwned = await prisma.project.count({
      where: {
        ownerId: userId
      }
    });

    const projectsJoined = await prisma.projectMember.count({
      where: {
        userId
      }
    });

    const tasksAssigned = await prisma.task.count({
      where: {
        assigneeId: userId
      }
    });

    const tasksCompleted = await prisma.task.count({
      where: {
        assigneeId: userId,
        status: "DONE"
      }
    });

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    const pendingInvitations = await prisma.invitation.count({
      where: {
        email: user.email,
        status: "PENDING"
      }
    });

    res.json({
      projectsOwned,
      projectsJoined,
      tasksAssigned,
      tasksCompleted,
      pendingInvitations
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};