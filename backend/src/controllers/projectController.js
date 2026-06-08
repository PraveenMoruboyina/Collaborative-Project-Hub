const prisma = require("../config/db");

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        ownerId: req.user.id
      }
    });

    await prisma.projectMember.create({
      data: {
        userId: req.user.id,
        projectId: project.id,
        role: "OWNER"
      }
    });

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getMyProjects = async (req, res) => {
  try {
    const projects = await prisma.projectMember.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        project: true
      }
    });

    res.json(projects);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getProjectMembers = async (req, res) => {
  try {
    const { id } = req.params;

    const members = await prisma.projectMember.findMany({
      where: {
        projectId: id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json(members);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};