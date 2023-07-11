import React, { useState } from 'react';
import './card.css';
import { FaHeart, FaComment, FaInfoCircle } from 'react-icons/fa';

const Card = ({ post, socket, user }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };
  const handleLikeToggle = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
    setLiked(!liked);
  
    // Emit event to the server
    socket.emit("toggleLike", { postId: post.id, liked: !liked });
  
    // Send notification
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type: 1, // Assuming type 1 represents a like notification
    });
  };
  

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        <div className="cardIcon">
          <FaHeart
            className={liked ? 'heart-icon filled' : 'heart-icon'}
            onClick={handleLikeToggle}
          />
          <span>{likeCount}</span>
        </div>
        <div className="cardIcon">
          <FaComment onClick={() => handleNotification(2)} />
        </div>
        <div className="infIcon">
          <FaInfoCircle />
        </div>
      </div>
    </div>
  );
};

export default Card;
