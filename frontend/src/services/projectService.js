import api from '../api/axios'

const createProject = async(data) => {
    const { name, description } = data;
    const response = await api.post('/projects', { name, description })
    return response.data;
}

const projects = async () => {
    const response = await api.get('projects')
    return response.data
}

const getProjectById = async (id) => {
    const response = await api.get(`projects/${id}`);
    return response.data
}

 const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

export {
    createProject,
    projects,
    getProjectById,
    deleteProject
}
