import React, { useState } from 'react';
import { Link,  useNavigate ,useLocation } from 'react-router-dom';
import AuthService from './AuthService';
import './register.css';

const Register = () => {
  const [fName, setFirstName] = useState('');
  const [lName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterClick = () => {
    AuthService.register(fName, lName, email, nationality, password)
      .then((userId) => {
        navigate(`/api/v1/destination/${id}/user/${userId}`);
      })
      .catch((error) => {
        const errorMessage = error.response ? error.response.data.message : error.message;
        setError(errorMessage);
        alert("Please check that your input adheres to the character requirements. If you have already registered with this email, please log in or use a different email address." );
      });
  };
  return (
    <form className="registerForm">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" value={fName} onChange={handleFirstNameChange} required />
        <small>Max of 50 characters and min of 3 </small>      
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={lName} onChange={handleLastNameChange} required />
          <small>Max of 50 characters and min of 3 </small>  
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={email} onChange={handleEmailChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="nationality">Nationality:</label>
        <input type="text" id="nationality" value={nationality} onChange={handleNationalityChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" value={password} onChange={handlePasswordChange} required />
        <small>At least 6 characters</small>     
      </div>
      <button type="button" className="button" onClick={handleRegisterClick}>
        Register
      </button>
      <div className="already-have-account">
        Already have an account? <Link to={`/login?id=${id}`}>Login here</Link>
      </div>
    </form>
  );
};

export default Register;