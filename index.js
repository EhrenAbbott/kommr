//Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"
import { firebaseConfig } from '../config/firebase.config.js'
import { 
    getAuth, 
    createUserWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"


//Global Variables
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

//HTML Elements//
const createAccountButtonEl = document.getElementById("create-account-btn")
const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

//Event Listeners
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)



function authCreateAccountWithEmail() { 
    const email = emailInputEl.value
    const password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
        })
        .catch((error) => {
            console.error(error.message)
        });
    }

    // function authCreateAccountWithEmail() {
    //     const email = emailInputEl.value
    //     const password = passwordInputEl.value
    
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             console.log(userCredential)
    //         })
    //         .catch((error) => {
    //             console.error(error.message) 
    //         })
    // }

