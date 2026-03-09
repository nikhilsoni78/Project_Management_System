const projectRouter = require('express').Router()

const {createProject,
    getAllProjects,
    getProject,
    deleteProject} = require('../controllers/projectController')

projectRouter.route('/projects').get(getAllProjects).post(createProject)
projectRouter.route('/projects/:id').get(getProject).delete(deleteProject)


module.exports = projectRouter