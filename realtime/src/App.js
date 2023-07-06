import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from "./pages/Navbar/navbar"
import Card from "./pages/Card/card"
import { posts } from "./data"
import io from "socket.io-client";

function App() {
  const [username, setUsername] = useState('');
  const [User, setUser] = useState('');
  const [socket ,setSocket] =useState(null)

  useEffect(() => {
    setSocket(io("http://localhost:5000")); // Use "http://" instead of "https://" for local development
    // console.log(socket); // Store the Socket.IO client instance in state

   
  }, []);
  useEffect(()=>{
 socket?.emit("newUser",User)
  },[socket,User])

  console.log(User);

  return (
    <div className="app">
      {User ? (
        <>
          <Navbar socket={socket}/>
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={User}/>
          ))}
          <span className='username'>{User}</span>
        </>
      ) : (
        <div className="login-page">
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label>Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <button type="button" onClick={() => setUser(username)}>Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
