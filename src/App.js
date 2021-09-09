
import './App.css';
import * as firebase from "firebase/app";
import firebaseConfig from './firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { useState } from 'react';
import { FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";


firebase.initializeApp(firebaseConfig);


function App() {
const [user, setUser] = useState({})
const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
const ghProvider = new GithubAuthProvider();
  const handleGoogleSignIn = () =>{
    
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      setUser(user);
    }).catch((error) => {
      
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage,email, credential);
    });
  }

  const handleFacebookSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
    
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log('fb user', user);
        setUser(user)
      })
      .catch((error) => {
      
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
    
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  const handleGitHubSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, ghProvider)
    .then((result) => {
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    setUser(user);
    console.log('gh user', user)
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GithubAuthProvider.credentialFromError(error);
    console.log('error', errorCode, errorMessage, email, credential);
  });
  }


  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign in using google</button>
      <br />
      <button onClick={handleFacebookSignIn}>Sign in using facebook</button>
      <br />
      <button onClick={handleGitHubSignIn}>Sign in using Github</button>
      <h3>Email: {user.email}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
