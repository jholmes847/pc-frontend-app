import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'



const App = () => {

  // Database Toggle
  // const apiUrl = "https://pc-backend-app.herokuapp.com"
  const apiUrl = "http://localhost:8000"

  const [post, setPost] = useState([])


  const getPost = () => {
    axios.get(`${apiUrl}/api/posts`)
    .then(response => setPost(response.data),
    err=> console.log(err)
  )
  .catch(error=> console.error(error))
  }
  
  const handleCreate = (setPost) => {
    axios
      .post(`${apiUrl}/api/posts`, setPost)
      .then((response) => {
        getPost()
      })
  }

  const handleUpdate = (editPost) => {
    axios.put(`${apiUrl}/api/posts/` + editPost.id, editPost)
    .then((response) => {
     getPost()
      
    })
  }

  const handleDelete = (deletedPost) => {
    axios.delete(`${apiUrl}/api/posts/` + deletedPost.id)
    .then((response) => {
     getPost()
     
    })
  }

 


  useEffect(() => {
    getPost()
   }, [])

  return (
    <>
      <h1>App</h1>
      <Add handleCreate={handleCreate} />
      <div className="posts">
 {post.map((person) => {
   return (
     <div className="post" key={post.id}>
      Name: {post.name}
      Post: {post.post}
      CPU: {post.cpu}
      GPU: {post.gpu}
      Mobo: {post.gpu}
      Ram: {post.ram }
      Psu: {post.cooler}
      Storage: {post.storage}
      Case: {post.storage}
      <Edit handleUpdate={handleUpdate} post={post}/>
            <button onClick={() => {handleDelete(post)}}>
            X
            </button>

     </div>
   )
 })}
</div>
    </>
  )
}

export default App