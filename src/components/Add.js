import React, { useState, useEffect } from 'react'

const Add = (props) => {
  const emptyPost = {name: '', description: '', cpu:'', cooler:'',  mobo: '', ram: '', psu: '', gpu: '', storage:'', case:'', img:'',}

  // Hooks - /components/Add.js
  const [post, setPost] = useState(emptyPost)

  // Handlers - /components/Add.js
  const handleChange = (event) => {
      setPost({...post, [event.target.name]: event.target.value})
    }
  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleCreate(post)
    setPost({name: '', description: '', cpu:'', cooler:'',  mobo: '', ram: '', psu: '', gpu: '', storage:'', case:'', img:'',})
  }

  // Return - /components/Add.js
  return (
    <>
    <h3> Add Post</h3>
    {/* {toggleAdd ? */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
          <input type="text" name="name" value={post.name} onChange={handleChange} />
        <br/><br/>
        <label htmlFor="description">Description: </label>
          <input type="text" name="description" value={post.description} onChange={handleChange} />
        <br/><br/>
        <label htmlFor="cpu">CPU: </label>
          <input type="text" name="cpu" value={post.cpu} onChange={handleChange} />
        <br/><br/>
        <label htmlFor="cooler">Cooler: </label>
          <input type="text" name="cooler" value={post.cooler} onChange={handleChange} />
        <br/><br/>
        <label htmlFor="mobo">MOBO: </label>
          <input type="text" name="mobo" value={post.mobo} onChange={handleChange} />
        <br/><br/>
        <label htmlFor="ram">RAM: </label>
          <input type="text" name="ram" value={post.ram} onChange={handleChange} />
        <br/><br/>
        <label htmlFor="psu">PSU: </label>
          <input type="text" name="psu" value={post.psu} onChange={handleChange} />
        <br/><br/>
        <label htmlFor="gpu">GPU: </label>
          <input type="text" name="gpu" value={post.gpu} onChange={handleChange} />
        <br/><br/>
        <label htmlFor="storage">Storage: </label>
          <input type="text" name="storage" value={post.storage} onChange={handleChange} />
        <br/><br/>
        <label htmlFor="case">Case: </label>
          <input type="text" name="case" value={post.case} onChange={handleChange} />
        <br/><br/>
        <label htmlFor="img">Image: </label>
          <input type="text" name="img" value={post.img} onChange={handleChange} />
        <br/><br/>
        <input type="submit" />
      </form>
    {/* : null} */}


    </>

  )
}
export default Add
