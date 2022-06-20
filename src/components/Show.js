import React, { useState, useEffect } from 'react'

const Show = (props) => {
  const [post, setPost] = useState({...props.post})


  return (
    <>
      <p>Name: {post.name}</p>
      <p>show page </p>
    </>
  )

}
export default Show
