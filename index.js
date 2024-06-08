//Imports

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"
import { firebaseConfig } from '../config/firebase.config.js'
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"


//Global Variables

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

//HTML Elements/

const loggedOutView = document.getElementById("logged-out-view")
const loggedInView = document.getElementById("logged-in-view")

const createAccountButtonEl = document.getElementById("create-account-btn")
const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")
const loginBtnEl = document.getElementById("login-btn")
const logoutBtnEl = document.getElementById("logout-btn")


//Event Listeners

createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)
loginBtnEl.addEventListener("click", authSignInWithEmail)
logoutBtnEl.addEventListener("click", authSignOut)


//Main Code

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      showLoggedInView()
    } else {
      showLoggedOutView()
  }
  });

showLoggedOutView()

//Auth functions

function authSignInWithEmail() { 
    const email = emailInputEl.value
    const password = passwordInputEl.value

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            clearAuthFields()
            console.log("successfully logged in")
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }

function authCreateAccountWithEmail() { 
    const email = emailInputEl.value
    const password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            clearAuthFields()
            console.log("account created with email")
        })
        .catch((error) => {
            console.error(error.message)
        });
    }

function authSignOut(){ 
    signOut(auth).then(() => {
        console.log("signout successfull")
    }).catch((error) => {
        console.log(error)
    });
}

//UI Functions

function clearInputField(field){ 
    field.value = ""
}

function clearAuthFields() {
	clearInputField(emailInputEl)
	clearInputField(passwordInputEl)
}

function showLoggedInView(){ 
    hideView(loggedOutView)
    showView(loggedInView)
}

function showLoggedOutView() {
    hideView(loggedInView)
    showView(loggedOutView)
}

function hideView(view){ 
    view.style.display = "none"
}

function showView(view){ 
    view.style.display = "flex"
}


