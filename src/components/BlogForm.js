import React from 'react'

const BlogForm = ({
    title,
    author,
    url,
    onSubmit
}) => {

    /**
     * Toma el valor de `reset` dentro de `title` y lo guarda en `resetTitle`
     * Las demas propiedades de `title` son pasadas a `titleProps`
     * */
    const { reset: resetTitle, ...titleProps } = title
    const { reset: resetAuthor, ...authorProps } = author
    const { reset: resetUrl, ...urlProps } = url

    return (
        <>
            <h2>Create new blog post</h2>
            <form onSubmit={onSubmit}>
                <div>
                    Title:
                    <input {...titleProps} />
                </div>
                <div>
                    Author:
                    <input {...authorProps} />
                </div>
                <div>
                    URL:
                    <input {...urlProps} />
                </div>
                <button type="submit">Create</button>
            </form>
        </>
    );
}

export default BlogForm