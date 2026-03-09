const ProjectModel = require('../models/Project')
const { BadrequestError, NotFoundError } = require('../Errors')
const { StatusCodes } = require('http-status-codes')

const createProject = async (req, res) => {
    
    const { name, description } = req.body
    if (!name?.trim() || !description?.trim()) {
        throw new BadrequestError("Name and Description are Required")
    }

    const savedProject = await ProjectModel.create({
        name,
        description,
        createdBy: req.user.userId
    })

    res.status(StatusCodes.CREATED).
        json({
            success: true,
            message: "Project Created",
            data: savedProject
        })
}

const getAllProjects = async (req, res) => {
    const projects = await ProjectModel.find({createdBy: req.user.userId});
    if (projects.length === 0) {
        throw new NotFoundError("No project Available")
    }
    res.status(StatusCodes.OK).json({success: true, data:projects, count: projects.length})
}

const getProject = async (req, res) => {
    const project = await ProjectModel.findOne({ _id: req.params.id, createdBy: req.user.userId })
    if (!project) {
        throw new NotFoundError("No Project Found")
    }
    res.status(StatusCodes.OK).json({success: true, data: project})
}

const deleteProject = async (req, res) => {
    const result = await ProjectModel.deleteOne({ _id: req.params.id, createdBy: req.user.userId });
       if (result.deletedCount === 0) {
        throw new NotFoundError("Project not found");
    }
    res.status(StatusCodes.OK).json({success: true, message: "Project Deleted SuccssFully"})
}

module.exports = {
    createProject,
    getAllProjects,
    getProject,
    deleteProject
}