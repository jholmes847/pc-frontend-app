import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'



const App = () => {

  const [post, setPost] = useState([])


  const getPost = () => {
    axios.get('http://localhost:8000/api/post')
    .then(response => setPost(response.data),
    err=> console.log(err)
  )
  .catch(error=> console.error(error))
  }
  
  const handleCreate = (setPost) => {
    axios
      .post('http://localhost:8000/api/post', setPost)
      .then((response) => {
        setPost([...post, response.data])
      })
  }

  const handleUpdate = (editPost) => {
    axios.put('http://localhost:8000/api/post/' + editPost.id, editPost)
    .then((response) => {
      setPost(post.map((post) => {
        return post.id !== response.data.id ? post : response.data
      }))
    })
  }

  const handleDelete = (deletedPost) => {
    axios.delete('http://localhost:8000/api/post/' + deletedPost.id)
    .then((response) => {
      setPost(post.filter(post => post.id !== deletedPost.id))
     
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