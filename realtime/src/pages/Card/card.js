import React, { useState } from 'react'
import "./card.css"
import { FaHeart, FaComment, FaInfoCircle } from 'react-icons/fa';


const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    type === 1 && setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  return (
    <div className='card'>
      <div className='info'>
        <img src={post.userImg} alt="" className='userImg'/>
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className='postImg' />
      <div className='interaction'>
        <div className='cardIcon'>
        <FaHeart
        className={liked ? 'heart-icon filled' : 'heart-icon'}
        onClick={() => handleNotification(1)}
      />
    
</div>
      <div className='cardIcon'>
      <FaComment  onClick={() => handleNotification(2)}/></div>
      <div className='infIcon'>
      <FaInfoCircle /></div>
      </div>
    </div>
  )
}

export default Card

