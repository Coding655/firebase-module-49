import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const LogIn = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  console.log(app);
  const provider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setUser(loggedUser);
      })
      .catch((error) => {
        console.log("error", error.massage);
      });
  };
  const handleSIgnOut = () => {
    signOut(auth)  
    .then(result => {
        setUser(null)
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })
  }
  const handleGitHub = () => {
    signInWithPopup(auth, gitHubProvider)
    .then(result => {
        const gitUser = result.user;
        setUser(gitUser)
        
    })
    .catch(error => {
        console.log(error)
    })
  }

  return (
    <div>
      { user ?
        <button onClick={handleSIgnOut}>Sign Out</button> :
        <div>
            <button onClick={handleGoogleSignIn}>Google Login</button> 
            <button onClick={handleGitHub}>GitHub Login</button>
        </div>
      }
      {user && (
        <div>
          <h2>User: {user.displayName}</h2>
          <p>User_Email: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default LogIn;
