import axios from 'axios'

// This env variable is defined in the webpack config
const baseUrl = `${BACKEND_URL}/api/`

const login = async credentials => {
    const response = await axios.post(baseUrl + 'login', credentials)
    return response.data
}

const getAllUsers = async () => {
    const response = await axios.get(baseUrl + 'users')
    return response.data
}

export default { login, getAllUsers }