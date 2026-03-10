const taskRouter = require('express').Router()
const authentication = require('../middlewares/authentication')

const {
        createTask,
        getByProject,
        updateStatus,
        deleteTask,
        updatePriority
} = require('../controllers/taskController')

taskRouter.route('/tasks/:projectId').post(authentication,createTask)
taskRouter.route('/tasks/project/:projectId').get(authentication,getByProject)
taskRouter.route('/tasks/:taskId/status').patch(authentication,updateStatus)
taskRouter.route('/tasks/:taskId/priority').patch(authentication,updatePriority)
taskRouter.route('/tasks/:taskId').delete(authentication,deleteTask)


module.exports = taskRouter