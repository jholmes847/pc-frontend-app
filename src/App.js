import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
import './style/style.css'
import Fuse from 'fuse.js'
import { FaStar } from 'react-icons/fa'

const App = () => {

  // Database API URL Switch Heroku/Local
  const apiUrl = 'https://pc-backend-app.herokuapp.com'
  // const apiUrl = 'localhost:8000'

  // Hooks
  const [post, setPost] = useState([])
  const [showPost, setShowPost] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState('')
  const [rating, setRating] = useState(null)
  const [ratingHover, setRatingHover] = useState()

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

  // Search Component
  const fuse = new Fuse (post, {
    keys: [
      'name',
      'cpu',
      'cooler',
      'mobo',
      'ram',
      'psu',
      'gpu',
      'storage',
      'case'
    ]
  })
  const results = fuse.search(query)
  const postResults = query ? results.map(result => result.item) : post
  function postSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

  //Effect Hook
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
        <Add handleCreate={handleCreate} />
        <br/><br/>
        {/* Search and Filter component */}
        <button className="button-primary" onClick={()=>setShowSearch(s=>!s)}>Search Builds</button>
        {showSearch ?
        <input type = "text" value={query} onChange={postSearch} />
        : null }
      </div>

      <div>
        {postResults.map((post) => {
          return (
            <div className="card" key={post.id}>
              <div className="zoom-cont">
                <img src={`${post.img}`} />
              </div>

              {/* Star Rating Component */}
              <div className="rating">
                {[ ...Array(5)].map((stars, i) => {
                  const starRating = i + 1
                  return (
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        value={starRating}
                        onClick={() => setRating(starRating)}
                        
                      />
                      <FaStar 
                        className="star"
                        color={starRating <= (ratingHover || rating) ? "#f4e845" : "#c9c9c9"}
                        onMouseEnter={() => setRatingHover(starRating)}
                        onMouseLeave={() => setRatingHover(null)}
                      />
                    </label>
                  )
                })}
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