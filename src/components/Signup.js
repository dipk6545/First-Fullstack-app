import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const [credentials, setCredentials] = useState({ first: '', last: '', email: '', password: '', cpassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords don't match", "warning");
    } else {
      const { first, last, email, password } = credentials;
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: first + ' ' + last,
          email: email,
          password: password,
        }),
      });
      res = await response.json();
    }

    console.log(res);
    if (res !== undefined && res.success) {
      // redirect
      localStorage.setItem('token', res.authToken);
      navigate('/');
      props.showAlert("User created successfully", "success")
      setCredentials({ first: '', last: '', email: '', password: '', cpassword: '' });
    } else if (res !== undefined) {
      props.showAlert('User exists', "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label className="h5" htmlFor="exampleInputEmail1">
              First Name
            </label>
            <input type="first" className="form-control" id="first" name="first" placeholder="First name" value={credentials.first} onChange={onChange} />
          </div>
          <div className="col">
            <label className="h5" htmlFor="exampleInputEmail1">
              Last Name
            </label>
            <input type="last" className="form-control" id="last" name="last" placeholder="Last name" value={credentials.last} onChange={onChange} />
          </div>
        </div>

        <div className="form-group my-3">
          <label className="h5" htmlFor="exampleInputEmail1">
            Email address
          </label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onChange} />
        </div>
        <div className="form-group my-3">
          <label className="h5" htmlFor="exampleInputPassword1">
            Password
          </label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange} minLength={6} required />
        </div>
        <div className="form-group my-3">
          <label className="h5" htmlFor="exampleInputPassword1">
            Confirm Password
          </label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Re-type Password" value={credentials.cpassowrd} onChange={onChange} minLength={6} required />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
