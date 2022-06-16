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
        setPost([...post, response.data])
      })
  }

  const handleEdit = (editPost) => {
    axios.put('https://pc-backend-app.herokuapp.com/api/posts' + editPost.id, editPost)
    .then((response) => {
      setPost(post.map((post) => {
        return post.id !== response.data.id ? post : response.data
      }))
      
    })
  }

  const handleDelete = (deletePost) => {
    axios.delete('https://pc-backend-app.herokuapp.com/api/posts' + deletePost.id)
    .then((response) => {
      setPost(post.filter(post => post.id !== deletePost.id))
     
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
      <br></br>
      Post: {post.post}
      <br></br>
      CPU: {post.cpu}
      <br></br>
      GPU: {post.gpu}
      <br></br>
      Mobo: {post.gpu}
      <br></br>
      Ram: {post.ram }
      <br></br>
      Psu: {post.cooler}
      <br></br>
      Storage: {post.storage}
      <br></br>
      Case: {post.storage}
      <Edit handleUpdate={handleEdit} post={post}/>
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