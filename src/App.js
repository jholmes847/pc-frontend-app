import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
import Show from './components/Show'
import './App.css'

const App = () => {

  const [post, setPost] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [darkModeButton, setDarkModeButton] = useState("Light")
  const [toggleShow, setToggleShow] = useState("")

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
    axios.get('https://pc-backend-app.herokuapp.com/api/posts').then((response) => {
      getPost(response.data)
    })
   }, [])

   const darkLight = (event) => {
        if (darkMode == false) {
            setDarkModeButton("Dark")
            setDarkMode(true)
      }
      else {
        setDarkModeButton("Light")
        setDarkMode(false)
      }
   }

   const cardCover = (post) => {
     return(
       <>

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
        <button onClick={() => {handleToggleShow(post)}}> show </button>

       </>
     )
   }

   const cardShow = (post) => {
     return(
       <>

       <Show post={post}/>
       <button onClick={() => {handleToggleShow(post)}}> show </button>

         <Edit handleUpdate={handleUpdate} post={post}/>
         <button onClick={() => {handleDelete(post)}}>
           delete
         </button>

       </>
     )
   }

   const handleToggleShow = (post) => {
     toggleShow != `${post.id}`
     ?  setToggleShow(`${post.id}`)
     :  setToggleShow(``)
   }


  return (
    <div style={{backgroundColor: darkMode ? 'grey' : 'white'}}>
      <h1>App</h1>
      <div class="add">
        <Add handleCreate={handleCreate} />
        <button onClick={darkLight}>{darkModeButton}</button>
      </div>
      <div className="posts">
        {post.map((post) => {
          return (
            <div className="post" key={post.id}>
            {toggleShow != `${post.id}`
              ? cardCover(post)
              : cardShow(post)
            }
            </div>
          )
       })}
      </div>
    </div>
  )
}

export default App
