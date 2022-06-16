import {useState} from 'react'

const Edit = (props) => {
    const [post, setPost] = useState({...props.post})

const handleChange = (event) => {
     setPost({...post, [event.target.name]: event.target.value})
    }
    
const handleSubmit = (event) => {
    event.preventDefault()
    props.handleEdit(post)
   
}

return(
    <>
      <details>
        <summary>Edit Post</summary>
        <form onSubmit={handleSubmit}>
    <label htmlFor='name' >Name: </label>
    <input type="text" name="name" value={post.name} onChange=      {handleChange} />
    <br />
    <br />
    <label htmlFor='post' >POST: </label>
    <input type="text" name="post" value={post.post} onChange={handleChange} />
    <br />
    <br />
    <label htmlFor='CPU' >CPU: </label>
    <input type="text" name="cpu" value={post.cpu} onChange={handleChange} />
    <br/>
    <br/>
    <label htmlFor='GPU' >GPU: </label>
    <input type="text" name="gpu" value={post.gpu} onChange={handleChange} />
    <br />
    <br />
    <label htmlFor='Mobo' >Mobo: </label>
    <input type="text" name="mobo" value={post.mobo} onChange={handleChange} />
    <br />
    <br />
    <label htmlFor='Ram' >Ram: </label>
    <input type="text" name="ram" value={post.ram} onChange={handleChange} />
    <br />
    <br />
    <label htmlFor='PSU'> PSU: </label>
    <input type="text" name="psu" value={post.psu} onChange={handleChange} />
    <br />
    <br />
    <label htmlFor='Cooler' >Cooler: </label>
    <input type="text" name="cooler" value={post.cooler} onChange={handleChange} />
    <br />
    <br />
    <label htmlFor='Storage' >Storage: </label>
    <input type="text" name="storage" value={post.storage} onChange={handleChange} />
    <br />
    <br />
    <label htmlFor='Case'>Case: </label>
    <input type="text" name="case" value={post.case} onChange={handleChange} />
    <br/>
          <input type='submit'/>
        </form>
      </details>
    </>
  )
}



export default Edit