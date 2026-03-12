const projectRouter = require('express').Router()

const {createProject,
    getAllProjects,
    getProject,
    deleteProject,
    addMembers
} = require('../controllers/projectController')

projectRouter.route('/projects').get(getAllProjects).post(createProject)
projectRouter.route('/projects/:id').get(getProject).delete(deleteProject)
projectRouter.route('/projects/:id/members').patch(addMembers)


module.exports = projectRouter