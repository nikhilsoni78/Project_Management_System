

const createTask = async (req, res) => {
    res.send('created')
}
const getByProject = async (req, res) => {
    res.send('get')
}
const updateStatus = async (req, res) => {
    res.send('update')
}
const deleteTask = async (req, res) => {
    res.send('deleted')
}

module.exports = {
    createTask,
    getByProject,
    updateStatus,
    deleteTask
}