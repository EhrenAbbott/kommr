import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { firebaseConfig } from '../config/firebase.config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"


/* === Firebase Setup === */
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

/* == UI - Elements == */
const emailInputEl = document.getElementById('login-input')
console.log(emailInputEl)

function authCreateAccountWithEmail() { 
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

export default function Login(){ 
    return ( 
        <form className='login-container'> 
            <h1 className='login-title'>Kommr</h1>
            <div className='login-input'>
                <input id='email-input' placeholder="Email"></input>
                <input id='password-input' placeholder="Password"></input>
            </div>
            <button className='login-button'>Login</button>
            <button className='create-account-button'>Create Account</button>
            <p className='alt-login-text'>-or login with-</p>
            <div className='login-logo-container'> 
                <button className='apple-btn'><img src="../assets/icons/apple.png"></img></button>
                <button className='fb-btn'><img src="../assets/icons/facebook.png"></img></button>
                <button className='google-btn'><img src="../assets/icons/google.png"></img></button>
            </div>
        </form>
    )
}

