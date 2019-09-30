import React from 'react'

const BlogForm = ({
    title,
    author,
    url,
    onSubmit
}) => (
    <>
        <h2>Create new blog post</h2>
        <form onSubmit={onSubmit}>
            <div>
                Title:
                <input { ...title } />
            </div>
            <div>
                Author:
                <input { ...author } />
            </div>
            <div>
                URL:
                <input { ...url } />
            </div>
            <button type="submit">Create</button>
        </form>
    </>
)

export default BlogForm