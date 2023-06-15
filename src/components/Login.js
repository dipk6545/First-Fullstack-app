import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const res = await response.json();
    if (res.success) {
      // redirect
      localStorage.setItem('token', res.authToken);
      props.showAlert('Login successful', 'success');
      setCredentials({ email: '', password: '' });
      navigate('/');
    } else {
      props.showAlert('Enter correct credentials', 'danger');
    }    
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
      <div className="container card py-3">
          <form onSubmit={handleSubmit}>
              <div className="form-group my-3">
                  <label className="h5" htmlFor="exampleInputEmail1">
                      Email address
                  </label>
                  <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={credentials.email}
                      onChange={onChange}
                  />
              </div>
              <div className="form-group my-3">
                  <label className="h5" htmlFor="exampleInputPassword1">
                      Password
                  </label>
                  <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={onChange}
                      value={credentials.password}
                  />
              </div>
              <button type="submit" className="btn btn-primary">
                  Submit
              </button>
          </form>
      </div>
  );
}

export default Login;
