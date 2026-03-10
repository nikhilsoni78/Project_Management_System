const TaskModel = require('../models/Tasks')
const ProjectModel = require('../models/Project')
const { BadrequestError, UnauthorizedError, NotFoundError } = require('../Errors')
const { StatusCodes } = require('http-status-codes')

const createTask = async (req, res) => {
    const {
        body: { title, dueDate },
        params: {projectId},
        user: {userId}
    } = req;
    console.log(projectId);
    
    if (!title || !dueDate) {
        throw new BadrequestError("Title and Duedate Id is Required")
    }
  
    if (!projectId) {
    throw new BadrequestError("ProjectId is required");
  }

  const project = await ProjectModel.findOne({
    _id: projectId,
    createdBy: userId
  });
    
    console.log(project);
    

  if (!project) {
    throw new NotFoundError("Project not found");
  }
    const savedTask = await TaskModel.create(
        {
            title,
            dueDate,
            projectId,
            assignedTo: userId
        });
    res.status(StatusCodes.CREATED).json({success: true, message: "Task Created Successfully", data: savedTask})
}


const getByProject = async (req, res) => {
    const { projectId } = req.params

    if (!projectId) {
        throw new BadrequestError("ProjectId is required")
    }

    const tasks = await TaskModel.find({
    projectId,
    assignedTo: req.user.userId
  });

  if (!tasks.length) {
    throw new NotFoundError("No tasks found");
  }

    res.status(StatusCodes.OK).json({ success: true, data: tasks})
}


const updateStatus = async (req, res) => {
    const { status } = req.body
    const {taskId} = req.params

    if (!status || !taskId) {
        throw new BadrequestError("Status and TaskId are Required")
    }

    const updatedTask = await TaskModel.findOneAndUpdate(
        {
            _id: taskId,
            assignedTo: req.user.userId
        }, { status },
        { runValidators: true, new: true })
    res.status(StatusCodes.OK)
        .json({
            success: true,
            message: "Update Successfully",
            data: updatedTask
        });
}

const updatePriority = async (req, res) => {
    const { priority } = req.body
    const {taskId} = req.params
    if (!priority || !taskId) {
        throw new BadrequestError("priority and TaskId are Required")
    }

    const updatedTask = await TaskModel.findOneAndUpdate(
        { _id: taskId, assignedTo: req.user.userId },
        { priority },
        { runValidators: true, new: true })
    
    res.status(StatusCodes.OK)
        .json(
            {
                success: true,
                message: "Task Update Successfully",
                data: updatedTask
            });
}


const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    const { userId } = req.user;

  if (!taskId) {
    throw new BadrequestError("Task ID is required");
  }

  const task = await TaskModel.findOneAndDelete({
    _id: taskId,
    assignedTo: userId
  });

  if (!task) {
    throw new NotFoundError("Task not found");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Task deleted successfully"
  });
}

module.exports = {
    createTask,
    getByProject,
    updateStatus,
    deleteTask,
    updatePriority
}