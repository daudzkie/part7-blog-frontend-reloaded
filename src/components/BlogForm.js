import React from 'react'

const BlogForm = ({
    onSubmit,
    title,
    author,
    url,
    handleBlogChange,
    handleAuthorChange,
    handleUrlChange
}) => (
    <>
        <h2>Create new blog post</h2>
        <form onSubmit={onSubmit}>
            <div>
                Title:
                <input
                    type="text"
                    value={title}
                    name="Blog"
                    onChange={handleBlogChange}
                />
            </div>
            <div>
                Author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={handleAuthorChange}
                />
            </div>
            <div>
                URL:
                <input
                    type="text"
                    value={url}
                    name="URL"
                    onChange={handleUrlChange}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    </>
)

export default BlogForm