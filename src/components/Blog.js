import React, { useState } from 'react'

const Blog = ({ blog }) => {
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
    console.log('Expanded')
  }

  return (
    <div style={blogStyle} onClick={showExpanded}>
      {expanded === false ?
        <div>
          {blog.title} - {blog.author}
        </div>
        :
        <div onClick={showExpanded}>
          <ul>
            <li>{blog.title}</li>
            <li>{blog.url === "" ? "No url provided" : blog.url}</li>
            <li>{blog.likes} <button onClick={() => console.log('liked')}>Like</button></li>
            <li>Added by {blog.author}</li>
          </ul>
 
        </div>}
    </div>
  )
}

export default Blog