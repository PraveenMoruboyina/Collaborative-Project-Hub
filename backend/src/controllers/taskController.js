const prisma = require("../config/db");

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      projectId,
      assigneeId
    } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        projectId,
        assigneeId
      }
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getProjectTasks = async (req, res) => {
  try {
    const { id } = req.params;

    const tasks = await prisma.task.findMany({
      where: {
        projectId: id
      }
    });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await prisma.task.update({
      where: {
        id
      },
      data: {
        status
      }
    });

    res.json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};