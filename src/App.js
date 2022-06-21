import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
import './style/style.css'
import Fuse from 'fuse.js'
import Show from './components/Show'
// import posts from 'https://pc-backend-app.herokuapp.com/api/posts?format=json'

const App = () => {

  // Database API URL Switch Heroku/Local
  const apiUrl = 'https://pc-backend-app.herokuapp.com'
  // const apiUrl = 'localhost:8000'

  // Hooks
  const [post, setPost] = useState([])
  const [showPost, setShowPost] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState('')
  const [showToggle, setShowToggle] = useState("")

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


   const handleShowToggle = (post) => {
     showToggle != `${post.id}`
     ? setShowToggle(`${post.id}`)
     : setShowToggle("")

   }




   // Return
  return (
    <>
    <div className="header">
        <h1>App</h1>
        <button onClick={toggleAdd}>Create New Post</button>
        {showPost == true ?
        <Add handleCreate={handleCreate} />
        : null}
        <br/><br/>
        {/* Search and Filter component */}
        <button className="button-primary" onClick={toggleSearch}>Search Builds</button>
        <input type = "text" value={query} onChange={postSearch} />
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
              <h1>{post.name}</h1>

              <br/>
            </div>
            :
            <div className="show" key={post.id}>
              <div onClick={() => {handleShowToggle(post)}}>
                <Show post={post} />
              </div>
              <Edit handleUpdate={handleUpdate} handleDelete={handleDelete} post={post}/>
            </div>

          )
       })}
      </div>
      <footer className='footer'>
            <span>℗ 2022</span>
            <span>Designed By Jeff Holmes + Alex Byun + Erik McQuarrie</span>
            </footer>
    </>
  )
}

export default App



// {/* {toggleSearch ?
//           <input className="search" placeholder="Search" onChange={(event) => {setQuery(event.target.value)}}/>
//         : null} */}
//         {/* {post.filter((posts) => {
//           if (query === '') {
//             return posts
//           } else if (posts.name.toLowerCase().includes(query.toLowerCase())) {
//             return posts
//           } else if (posts.cpu.toLowerCase().includes(query.toLowerCase())){
//             return posts
//           }
//         })} */}
