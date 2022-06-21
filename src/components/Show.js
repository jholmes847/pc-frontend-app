import React, { useState, useEffect } from 'react'
import '../style/style.css'

const Show = (props) => {
  const [post, setPost] = useState({...props.post})

  return (
    <>
      <div class="showName">
        <h2>{post.name}</h2>
      </div>
      <div class="showContainer">
        <div class="showList">
          <ul>
            <li class="item">CPU</li>
            <li class="itemName">&emsp; {post.cpu}
            <br/><br/>
            </li>
            <li class="item">Cooler</li>
            <li class="itemName">&emsp; {post.cooler}
            <br/><br/>
            </li>
            <li class="item">MOBO</li>
            <li class="itemName">&emsp; {post.mobo}
            <br/><br/>
            </li>
            <li class="item">RAM</li>
            <li class="itemName">&emsp; {post.ram}
            <br/><br/>
            </li>
            <li class="item">PSU</li>
            <li class="itemName">&emsp; {post.psu}
            <br/><br/>
            </li>
            <li class="item">GPU</li>
            <li class="itemName">&emsp; {post.gpu}
            <br/><br/>
            </li>
            <li class="item">Storage</li>
            <li class="itemName">&emsp; {post.storage}
            <br/><br/>
            </li>
            <li class="item">Case</li>
            <li class="itemName">&emsp; {post.case}
            <br/><br/>
            </li>
          </ul>
        </div>
        <div class="showDescription">
          <h3>Description</h3>
          <p class="p">
            <br/>
            {post.description}
          </p>
        </div>
        <div class="showImg">
          <img src={`${post.img}`} />
        </div>
      </div>
    </>
  )
}

export default Show