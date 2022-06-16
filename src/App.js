import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'


const App = () => {

  const [post, setPost] = useState([])

  const getPost = () => {
    axios
      .get('https://pc-backend-app.herokuapp.com/api/posts')
      .then(response => setPost(response.data),
      (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }

  const handleCreate = (addPost) => {
    axios
      .post('https://pc-backend-app.herokuapp.com/api/posts', addPost)
      .then((response) => {
        getPost()
      })
  }

  const handleUpdate = (editPost) => {
axios.put('https://pc-backend-app.herokuapp.com/api/posts/' + editPost.id, editPost)
    .then((response) => {
      setPost(post.map((post) => {
        return post.id !== response.data.id ? post : response.data
      }))
      
    })
  }

  const handleDelete = (deletedPost) => {
    axios.delete('https://pc-backend-app.herokuapp.com/api/posts/' + deletedPost.id)
    .then((response) => {
      setPost(
        post.filter(posts => posts.id !== deletedPost.id)
      );
     
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
        {post.map((post) => {
          return (
            <div className="post" key={post.id}>
              <p>Name: {post.name}</p>
              <p>Post: {post.post}</p>
              <p>CPU: {post.cpu}</p>
              <p>Cooler: {post.cooler}</p>
              <p>MOBO: {post.mobo}</p>
              <p>RAM: {post.ram}</p>
              <p>PSU: {post.psu}</p>
              <p>GPU: {post.gpu}</p>
              <p>Storage: {post.storage}</p>
              <p>Case: {post.case}</p>
              <Edit handleUpdate={handleUpdate} post={post}/>
              <button onClick={() => {handleDelete(post)}}>
                Delete
              </button>
            </div>
          )
       })}
      </div>
    </>
  )
}

export default App
