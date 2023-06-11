import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import Add from '../img/addAvatar.png'
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';


const Login = () => {
  const [error , setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
   e.preventDefault();
   const email = e.target[0].value;
   const password = e.target[1].value;

   try{
    await signInWithEmailAndPassword(auth, email, password) // sign in using firebase
    navigate('/')

   }catch(error){
    console.log('bhaari error hogayi..');
    setError(error.message)
   }

  }
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Social Photo Manager</span>
        <span className='title'>Sign in</span>
        <form className='authForm' onSubmit={handleSubmit}>
          <input type='email' placeholder='email'/>
          <input type='password' placeholder='password'/>
          <button>Sign in</button>
          {error && <span>{error}</span>}

        </form>
        <p>You don't have an account?<Link to='/register'> Register here</Link></p>
      </div>
    </div>
  )
}

export default Login;