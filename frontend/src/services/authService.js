import api from '../api/axios'


const getUsers = async () => {
    const response = await api.get('auth/users');
    return response.data
}


export {
    getUsers
}