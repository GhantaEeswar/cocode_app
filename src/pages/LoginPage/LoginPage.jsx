import React, { useState } from 'react';
import './LoginPage.css';
import {auth} from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const [emailSignIn, setEmailSignIn] = useState('');
  const [passwordSignIn, setPasswordSignIn] = useState('');

  const navigate = useNavigate();
  

  const signIn = (e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, emailSignIn, passwordSignIn)
    .then((userCredential)=>{
      console.log(userCredential);
      navigate('/');
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address');
      } else if (error.code === 400) {
        toast.error('Invalid password');
      } else {
        toast.error('Make sure your email and password are correct');
      }
    });
  };
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');

  const signUp = (e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp)
    .then((userCredential)=>{
      console.log(userCredential);
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-exists') {
        toast.error('Email already in use');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password is too weak');
      } else {
        toast.error('An error occurred');
      }
    });
  };

  return (
    <div className='body'>
      
    <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit = {signUp}>
          <h1>Create Account</h1>
          
          
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" 
                  value={emailSignUp}
                  onChange={(e)=>{setEmailSignUp(e.target.value);}}
          />
          <input type="password" placeholder="Password" 
                  value={passwordSignUp}
                  onChange={(e)=>{setPasswordSignUp(e.target.value);}}
          />
          <button type='submit'>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit = {signIn}>
          <h1>Sign In</h1>
          
          
          <input type="email" placeholder="Email" value={emailSignIn}
                  onChange={(e)=>{setEmailSignIn(e.target.value);}}/>
          <input type="password" placeholder="Password" value={passwordSignIn}
                  onChange={(e)=>{setPasswordSignIn(e.target.value);}}/>
          
          <button type='submit'>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className={`hidden ${isSignUp ? '' : 'active'}`} id="login" onClick={toggleForm}>Sign In</button>
          </div> 
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className={`hidden ${isSignUp ? 'active' : ''}`} id="register" onClick={toggleForm}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
