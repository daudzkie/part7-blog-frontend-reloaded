import React, { useState } from 'react'

const Blog = ({ blog, handleLikes }) => {
  const blogStyle = {
    padding: 7,
    border: 'solid',
    borderColor: 'cornflowerblue',
    borderWidth: 4,
    borderRadius: 10,
    marginBottom: 5
  }

  const [expanded, setExpanded] = useState(false)

  const showExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <div id={'blog'} style={blogStyle}>
      {expanded === false ?
        <div onClick={showExpanded}>
          {blog.title} - {blog.author}
        </div>
        :
        <div>
          <ul>
            <li>{blog.title}</li>
            <li>{blog.url === "" ? "No url provided" : blog.url}</li>
            <li>{blog.likes} <button onClick={() => handleLikes(blog.id, blog.likes)}>Like</button></li>
            <li>Added by {blog.author}</li>
          </ul>
            <button onClick={showExpanded}>Contract</button>
        </div>}
    </div>
  )
}

export default Blog