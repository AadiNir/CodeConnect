import React, { useState } from 'react'
import axios from 'axios';

function Register() {
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit =async (e) =>{
    e.preventDefault();
    if(formData.password!==formData.password2){
      console.log('both passowrd dosent match');
    }else{
      console.log(formData);
    }
   
  
  }
  return (
<section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={e=>onSubmit(e)} >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={e=>onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={e=>onChange(e)}           
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={e=>onChange(e)}
           
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            onChange={e=>onChange(e)}

         
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
     
    </section>  )
}

export default Register