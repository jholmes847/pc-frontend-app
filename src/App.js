import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
import './style/style.css'
import Fuse from 'fuse.js'
import Show from './components/Show'

const App = () => {

  // ------------------------------
  // Database API URL Switch Heroku/Local
  // ------------------------------
  const apiUrl = 'https://pc-backend-app.herokuapp.com'
  // const apiUrl = 'localhost:8000'

  // Hooks
  const [post, setPost] = useState([])
  const [showPost, setShowPost] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState('')
  const [showToggle, setShowToggle] = useState("")

  // ------------------------------
  // Handlers
  // ------------------------------
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
  const handleShowToggle = (post) => {
     showToggle != `${post.id}`
     ? setShowToggle(`${post.id}`)
     : setShowToggle("")
  }

  // ------------------------------
  // Search Component
  // ------------------------------
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

  // ------------------------------
  // Toggle fields
  // ------------------------------
  const toggleAdd = () => {
		setShowPost(!showPost)
	}
  const toggleSearch = () => {
		setShowSearch(!showSearch)
	}

  // ------------------------------
  //Effect Hook
  // ------------------------------
  useEffect(() => {
    axios.get(`${apiUrl}/api/posts`).then((response) => {
      getPost(response.data)
    })
  }, [])
  
  // ------------------------------
  // Return
  // ------------------------------
  return (
    <>
      <div className="header">
        <h1>Pretty PC</h1>
        <button className="btn" onClick={toggleAdd}>Create New Post</button>
        {showPost == true ?
        <Add handleCreate={handleCreate} />
        : null}
        <br/><br/>
        {/* Search and Filter component */}
        <button className="btn" onClick={()=>setShowSearch(s=>!s)}>Search Builds</button><br/>
        {showSearch ?
        <input type="text" placeholder="Search parts" value={query} onChange={postSearch} />
        : null }
        <br/>
      </div>
      <div>
        {postResults.map((post) => {
          return(
            showToggle != `${post.id}`
            ?
            <div className="card" key={post.id} onClick={() => {handleShowToggle(post)}}>
              <div className="zoom-cont">
                <img src={`${post.img}`} />
              </div>
              <h2>{post.name}</h2>
            </div>
            :
            <div className="show" key={post.id}>
              <div onClick={() => {handleShowToggle(post)}}>
                <Show post={post} />
              </div>
              <Edit handleUpdate={handleUpdate} handleDelete={handleDelete} post={post} getPost={getPost}/>
            </div>
          )
        })}
      </div>
      <footer className='footer'>
        <br/><br/>
        <span>℗ 2022 </span>
        <span>Designed By Jeff Holmes + Alex Byun + Erik McQuarrie</span>
        <br/><br/><br/>
        </footer>
    </>
  )
}

export default App