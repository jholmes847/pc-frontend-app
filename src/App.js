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
       <h4>Name: {post.name}</h4>
       <h5>CPU: {post.cpu}</h5>
     </div>
   )
 })}
</div>
    </>
  )
}

export default App