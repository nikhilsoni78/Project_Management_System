import api from '../api/axios.js'

const getTasksByProject =  async(projectId) => {
    const response = await api.get(`tasks/project/${projectId}`)
    return response.data
}

const createTask = async (newTask, projectId) => {
    const response = await api.post(`tasks/${projectId}`,newTask)
    return response.data
}

const updateStatus = async (status, taskId) => {
    const response = await api.patch(`tasks/${taskId}/status`,{status})
    return response.data;
}

const updatePriority = async (priority,taskId) => {
    const response = await api.patch(`tasks/${taskId}/Priority`,{priority})
    return response.data;
}

const deleteTask = async (taskId) => {
    const response = await api.delete(`tasks/${taskId}`)
    return response.data
}




export {
    getTasksByProject,
    createTask,
    updatePriority,
    updateStatus,
    deleteTask
}