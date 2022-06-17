import React, { useState, useEffect } from 'react'

const Add = (props) => {
    let emptyPost = {name: '', cpu: '', gpu: '', mobo: '', ram: '', psu: '', cooler:'', storage:'', case:''
  }

    const [post, setPost] = useState(emptyPost)
    const [toggleShow, setToggleShow] = useState(false)

    const handleChange = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
      }

      const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreate(post)
        setPost({name: '',post: '', cpu: '', gpu: '', mobo: '', ram: '', psu: '', cooler:'', storage:'', case:''})
      }

      const showForm = (event) => {
        toggleShow == false ?
        setToggleShow(true)
        :
        setToggleShow(false)
      }

      const render = () => {
        return (
          <>
        <div>
        <h3> Add Post</h3>
        </div>
        <form onSubmit={handleSubmit}>
    <label htmlFor="name">Name: </label>
    <input type="text" name="name" value={post.name} onChange=      {handleChange} />
    <br />
    <br />
    <label htmlFor="post">Post: </label>
    <input type="text" name="post" value={post.post} onChange={handleChange} />
    <br />
    <br />
    <label htmlFor="cpu">CPU: </label>
    <input type="text" name="cpu" value={post.cpu} onChange={handleChange} />
    <br/>
    <br/>
    <label htmlFor="gpu">GPU: </label>
    <input type="text" name="gpu" value={post.gpu} onChange={handleChange} />
    <br />
    <br />
    <label htmlFor="mobo">Mobo: </label>
    <input type="text" name="mobo" value={post.mobo} onChange={handleChange} />
    <br />
    <br />
    <label htmlFor="ram">Ram: </label>
    <input type="text" name="ram" value={post.ram} onChange={handleChange} />
    <br />
    <br />
    <label htmlFor="psu">PSU: </label>
    <input type="text" name="psu" value={post.psu} onChange={handleChange} />
    <br />
    <br />
    <label htmlFor="cooler">Cooler: </label>
    <input type="text" name="cooler" value={post.cooler} onChange={handleChange} />
    <br />
    <br />
    <label htmlFor="storage">Storage: </label>
    <input type="text" name="storage" value={post.storage} onChange={handleChange} />
    <br />
    <br />
    <label htmlFor="case">Case: </label>
    <input type="text" name="case" value={post.case} onChange={handleChange} />
    <br/>

    <input type="submit" />
    </form>
    </>
)
      }




      return (
        <>
        <button class="addPost" onClick={() => showForm()}> Add Post</button>
        {toggleShow == true ? render() : null}
        </>

      )
}
export default Add
