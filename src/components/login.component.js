import React, { useState } from 'react';
import { Link, useNavigate ,useLocation} from 'react-router-dom';
import AuthService from './AuthService';
import './login.css';

const Login = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const regId = new URLSearchParams(location.search).get('id');
  const { id } = useLocation().state || {};
  const [error, setError] = useState(null);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLoginClick = () => {
    AuthService.login(email, password)
      .then((userId) => {
        if (!regId) {
          navigate(`/api/v1/destination/${id}/user/${userId}`);
        } else {
          navigate(`/api/v1/destination/${regId}user/${userId}`);
        }
      })
      .catch((error) => {
        const errorMessage = error.response ? error.response.data.message : error.message;
        setError(errorMessage);
        alert("Email doesn't exist or password is incorrect.");
        });
     
        
  };
  return (
    <form className="loginForm">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={email} onChange={handleEmailChange} required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" value={password} onChange={handlePasswordChange} required />
      </div>
      <button type="button" className="button" onClick={handleLoginClick}>
        Login
      </button>
      <div className="not-registered">  
        Not registered? <Link to={`/register?id=${regId ? regId : id}`}>Register here</Link>
      </div>
    </form>
  );
};

export default Login;