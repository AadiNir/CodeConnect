import React, { useState } from 'react'

function Login() {
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  const onChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  } 
  const onSubmit = (e)=>{
    e.preventDefault();
    
  }
  return (

    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" >
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
          
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
          
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
  
    </section>

  ); 
}

export default Login