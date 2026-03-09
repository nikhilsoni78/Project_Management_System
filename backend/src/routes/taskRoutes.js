const taskRouter = require('express').Router()
const { createTask,
    getByProject,
    updateStatus,
    deleteTask} = require('../controllers/taskController')

taskRouter.route('/tasks').post(createTask)
taskRouter.route('/tasks/project/:projectId').get(getByProject)
taskRouter.route('/tasks/:id/status').patch(updateStatus)
taskRouter.route('/tasks/:id').delete(deleteTask)


module.exports = taskRouter