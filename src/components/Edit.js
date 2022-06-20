import {useState} from 'react'

const Edit = (props) => {
    const [post, setPost] = useState({...props.post})
    const [toggle, setToggle] = useState(false)

const handleChange = (event) => {
     setPost({...post, [event.target.name]: event.target.value})
    }

const handleSubmit = (event) => {
    event.preventDefault()
    props.handleUpdate(post)
}

const handleToggle = (event) => {
    toggle === false ?
      setToggle(true)
    :
      setToggle(false)
}

const submitFunc = () => {
  handleSubmit()
  handleToggle()
}

const render = () => {
  return(
    <details>
      <summary>Edit Post</summary>
      <form onSubmit={submitFunc}>
  <label htmlFor='name' >Name: </label>
  <br></br>
  <input type="text" name="name" value={post.name} onChange=      {handleChange} />
  <br />
  <br />
  <label htmlFor='post' >POST: </label>
  <br></br>
  <input type="text" name="post" value={post.post} onChange={handleChange} />
  <br />
  <br />
  <label htmlFor='CPU' >CPU: </label>
  <br></br>
  <input type="text" name="cpu" value={post.cpu} onChange={handleChange} />
  <br/>
  <br/>
  <label htmlFor='GPU' >GPU: </label>
  <br></br>
  <input type="text" name="gpu" value={post.gpu} onChange={handleChange} />
  <br />
  <br />
  <label htmlFor='Mobo' >Mobo: </label>
  <br></br>
  <input type="text" name="mobo" value={post.mobo} onChange={handleChange} />
  <br />
  <br />
  <label htmlFor='Ram' >Ram: </label>
  <br></br>
  <input type="text" name="ram" value={post.ram} onChange={handleChange} />
  <br />
  <br />
  <label htmlFor='PSU'> PSU: </label>
  <br></br>
  <input type="text" name="psu" value={post.psu} onChange={handleChange} />
  <br />
  <br />
  <label htmlFor='Cooler' >Cooler: </label>
  <br></br>
  <input type="text" name="cooler" value={post.cooler} onChange={handleChange} />
  <br />
  <br />
  <label htmlFor='Storage' >Storage: </label>
  <br></br>
  <input type="text" name="storage" value={post.storage} onChange={handleChange} />
  <br />
  <br />
  <label htmlFor='Case'>Case: </label>
  <br></br>
  <input type="text" name="case" value={post.case} onChange={handleChange} />
  <br/>
        <input type='submit'/>
      </form>
    </details>
  )
}

return(
    <>
      {
        toggle == false ?
          <details>
            <summary onClick={handleToggle}> Edit Post </summary>
          </details>
        :
          render()
      }
    </>
  )
}



export default Edit