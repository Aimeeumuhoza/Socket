import React, { useState } from 'react';
import './login.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [User,setUser]= useState('')

  console.log (User)

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        
        <button type="button" onClick={()=>setUser(username)}>Login</button>
      </form>
    </div>
  );
};

export default Login;
