import React, { useState, useEffect } from 'react'

const Add = (props) => {
    let emptyPosts = {name: '', cpu: '', gpu: '', mobo: '', ram: '', psu: '', cooler:'', storage:'', case:''
  }

    const [posts, setPosts] = useState(emptyPosts)

    const handleChange = (event) => {
        setPosts({...posts, [event.target.name]: event.target.value})
      }
    
      const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreate(posts)
        setPosts({name: '',post: '', cpu: '', gpu: '', mobo: '', ram: '', psu: '', cooler:'', storage:'', case:''})
      }
    
      return (
        <>

        
        <details>
          <summary> Add Posts </summary>
        <form onSubmit={handleSubmit}>
    <label htmlFor="name">Name: </label>
    <input type="text" name="name" value={posts.name} onChange=      {handleChange} />
    <br />
    <label htmlFor="post">Post: </label>
    <input type="text" name="post" value={posts.post} onChange={handleChange} /> 
    <br />
    <label htmlFor="cpu">CPU: </label>
    <input type="text" name="cpu" value={posts.cpu} onChange={handleChange} />
    <br/>
    <label htmlFor="gpu">GPU: </label>
    <input type="text" name="gpu" value={posts.gpu} onChange={handleChange} />
    <br />
    <label htmlFor="mobo">Mobo: </label>
    <input type="text" name="mobo" value={posts.mobo} onChange={handleChange} />
    <br />
    <label htmlFor="ram">Ram: </label>
    <input type="text" name="ram" value={posts.ram} onChange={handleChange} />  
    <br />
    <label htmlFor="psu">PSU: </label>
    <input type="text" name="psu" value={posts.psu} onChange={handleChange} />
    <br />
    <label htmlFor="cooler">Cooler: </label>
    <input type="text" name="cooler" value={posts.cooler} onChange={handleChange} />
    <br />
    <label htmlFor="storage">Storage: </label>
    <input type="text" name="storage" value={posts.storage} onChange={handleChange} />
    <br />
    <label htmlFor="case">Case: </label>
    <input type="text" name="case" value={posts.case} onChange={handleChange} />
    <br/>
    
    <input type="submit" />
</form>
</details>
        
        
        </>

      )
}
export default Add