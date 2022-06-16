import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'



const App = () => {

  const [post, setPost] = useState([])


  const getPost = () => {
    axios.get('https://pc-backend-app.herokuapp.com/api/posts')
    .then(response => setPost(response.data),
    err=> console.log(err)
  )
  }
  
  const handleCreate = (addPost) => {
    axios
      .post('https://pc-backend-app.herokuapp.com/api/posts', addPost)
      .then((response) => {
        getPost()
      })
  }

  const handleUpdate = (editPost) => {
    axios.put('https://pc-backend-app.herokuapp.com/api/posts' + editPost.id, editPost)
    .then((response) => {
     getPost()
      
    })
  }

  const handleDelete = (deletedPost) => {
    axios.delete('https://pc-backend-app.herokuapp.com/api/posts' + deletedPost.id)
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
     <div className="post">
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
            delete
            </button>

     </div>
   )
 })}
</div>
    </>
  )
}

export default App