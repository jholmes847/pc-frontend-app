import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
import './style/style.css'
import Fuse from 'fuse.js'

const App = () => {

  // Database API URL Switch Heroku/Local
  const apiUrl = 'https://pc-backend-app.herokuapp.com'
  // const apiUrl = 'localhost:8000'

  // Hooks
  const [post, setPost] = useState([])
  const [showPost, setShowPost] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState("")

  // Handlers
  const getPost = () => {
    axios
      .get(`${apiUrl}/api/posts`)
      .then(response => setPost(response.data),
      (err) => console.error(err)
      )
      .catch((error) => console.error(error))
  }
  const handleCreate = (addPost) => {
    axios
      .post(`${apiUrl}/api/posts`, addPost)
      .then((response) => {
        getPost()
      })
  }
  const handleUpdate = (editPost) => {
    axios.put(`${apiUrl}/api/posts/` + editPost.id, editPost)
      .then((response) => {
        setPost(post.map((post) => {
          return post.id !== response.data.id ? post : response.data
        }))
      })
  }
  const handleDelete = (deletedPost) => {
    axios.delete(`${apiUrl}/api/posts/` + deletedPost.id)
    .then((response) => {
      setPost(
        post.filter(posts => posts.id !== deletedPost.id)
      )
    })
  }

  // Search
  

  // Toggle fields - work in progress
  const toggleAdd = () => {
		setShowPost(!showPost)
	}
  const toggleSearch = () => {
		setShowSearch(!showSearch)
	}

  useEffect(() => {
    axios.get(`${apiUrl}/api/posts`).then((response) => {
      getPost(response.data)
    })
   }, [])

   // Return
  return (
    <>
      <div className="header">
        <h1>App</h1>
        <button onClick={toggleAdd}>Create New Post</button>
        <Add handleCreate={handleCreate} />
        <br/><br/>
        {/* Search and Filter component */}
        <button className="button-primary" onClick={toggleSearch}>Search Builds</button>
        {toggleSearch ?
          <input className="search" placeholder="Search" onChange={(event) => {setQuery(event.target.value)}}/>
        : null}
        {post.filter((posts) => {
          if (query === '') {
            return posts
          } else if (posts.name.toLowerCase().includes(query.toLowerCase())) {
            return posts
          } else if (posts.cpu.toLowerCase().includes(query.toLowerCase())){
            return posts
          }
        })}
      </div>

      <div>
        {post.map((post) => {
          return (
            <div className="card" key={post.id}>
              <div className="zoom-cont">
                <img src={`${post.img}`} />
              </div>
              <p>Name: {post.name}</p>
              <p>Description: {post.description}</p>
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
                delete
              </button>
              <br/>
            </div>
          )
       })}
      </div>
    </>
  )
}

export default App