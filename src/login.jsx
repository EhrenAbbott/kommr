import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

export default function Login(){ 
    return ( 
        <div className='login-container'> 
            <h1 className='login-title'>Kommr</h1>
            <div className='login-input'>
                <input placeholder="Email"></input>
                <input placeholder="Password"></input>
            </div>
            <button className='login-button'>Login</button>
            <button className='create-account-button'>Create Account</button>
        </div>
    )
}