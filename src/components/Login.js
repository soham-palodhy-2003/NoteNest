import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Stylings/Login.css';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      props.showAlert("Logged In Successfully", "success");
      navigate('/');
    } else {
      alert("Invalid credentials");
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <h1 style={{color:"green" }}>
        <b>Please Login To Continue to NoteNest</b></h1>
      <div className="login-header my-4" style={{color:"Blue",fontSize:"2rem", fontWeight:"bold"}}>Login</div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name='email' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <p className="mt-3" style={{color:"black"}}><b>
          Don't have an account?</b> <Link to="/signup"><b>Create one</b></Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
