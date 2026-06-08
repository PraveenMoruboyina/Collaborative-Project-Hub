const prisma = require("../config/db");

exports.createInvitation = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role } = req.body;
    const userId = req.user.id;

    const project = await prisma.project.findFirst({
      where: {
        id,
        ownerId: userId
      }
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found or you don't have permission"
      });
    }

    const invitation = await prisma.invitation.create({
      data: {
        email,
        role,
        projectId: id,
      }
    });

    res.status(201).json(invitation);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getInvitations = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const invitations = await prisma.invitation.findMany({
      where: {
        email: user.email
      }
    });

    res.json(invitations);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.acceptInvitation = async (req, res) => {
  try {
    const { id } = req.params;

    const invitation = await prisma.invitation.findUnique({
      where: {
        id
      }
    });

    if (!invitation) {
      return res.status(404).json({
        message: "Invitation not found"
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      }
    });

    if (!user || user.email !== invitation.email) {
      return res.status(403).json({
        message: "This invitation is not for you"
      });
    }

    await prisma.projectMember.create({
      data: {
        userId: user.id,
        projectId: invitation.projectId,
        role: invitation.role
      }
    });

    await prisma.invitation.update({
      where: {
        id
      },
      data: {
        status: "ACCEPTED"
      }
    });

    res.json({
      message: "Invitation accepted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};