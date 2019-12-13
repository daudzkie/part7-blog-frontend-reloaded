import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

// In this case we send only the id and number of likes, not the entire blog post
const update = async (id, newObject) => {

    /* This gives flexibility to craft the object on the 
        component itself, with the fields to be updated  */
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default {
    setToken,
    getAll,
    create,
    update,
    deleteBlog
}