const blogs = [
    {
        "likes": 4,
        "title": "1st post",
        "author": "Marco",
        "url": "git.com",
        "user": {
            "username": "rich",
            "name": "Marco",
            "id": "5d670541a02f2f1dc9b3f1df"
        },
        "id": "5d4aedcd4eebcf679912a053"
    },
    {
        "likes": 1,
        "title": "Testing user auth",
        "author": "Marco",
        "url": "me.org",
        "user": {
            "username": "root",
            "name": "Superuser",
            "id": "5d65484c66a4e32cf0cb66a8"
        },
        "id": "5d6562756bade545117027df"
    },
    {
        "likes": 2,
        "title": "2da prueba",
        "author": "Yo otra vez",
        "url": "qwe",
        "user": {
            "username": "rich",
            "name": "Marco",
            "id": "5d670541a02f2f1dc9b3f1df"
        },
        "id": "5d7c92e6f38ec44e5f3d2ae8"
    }
]

// Imitate the Promise returned by our service
const getAll = () => {
    return Promise.resolve(blogs)
}

// Imitate the function defined in our blog service 
let token

const setToken = newToken => {
    token = `bearer ${newToken}`

    return Promise.resolve(token)
}

export default { getAll, setToken }