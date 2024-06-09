//Imports

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"
import { firebaseConfig } from '../config/firebase.config.js'
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,

    } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"


//Global Variables

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider();

//HTML Elements/

const loggedOutView = document.getElementById("logged-out-view")
const loggedInView = document.getElementById("logged-in-view")

const createAccountButtonEl = document.getElementById("create-account-btn")
const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")
const loginBtnEl = document.getElementById("login-btn")
const logoutBtnEl = document.getElementById("logout-btn")
const googleBtnEl = document.getElementById("google-btn")
const facebookBtnEl = document.getElementById("fb-btn")
const userGreetingEl = document.getElementById("user-greeting")


//Event Listeners

createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)
loginBtnEl.addEventListener("click", authSignInWithEmail)
logoutBtnEl.addEventListener("click", authSignOut)
googleBtnEl.addEventListener("click", authSignInWithGoogle)
facebookBtnEl.addEventListener("click", authSignInWithFacebook)


//Main Code

onAuthStateChanged(auth, (user) => {
    if (user) {
      showLoggedInView()
      showUserGreeting(userGreetingEl, user)
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

function authSignInWithGoogle() { 
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
         }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
  });
}

function authSignInWithFacebook() { 
    signInWithPopup(auth, facebookProvider)
        .then((result) => {
            const user = result.user;
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
  })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = FacebookAuthProvider.credentialFromError(error);
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

function showUserGreeting(element, user) { 
    if (user !== null) {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;
        element.innerHTML = `Hello, ${email}`
    }
}


