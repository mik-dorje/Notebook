import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Logsign.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../FirebaseAuth";
function Login() {

    const [loginEmail, setLoginEmail] = React.useState("")
    const [loginPassword, setLoginPassword] = React.useState("")

  const [user, setUser] = React.useState("")
  
    const history = useHistory();
    function newSignup() {
        history.push("/signup")
    }

    const login = async (event) => {
      event.preventDefault();
        try {
          const response = await signInWithEmailAndPassword(
            auth,
            loginEmail, loginPassword
          );
          setUser(response);
          history.push("/notebook");
        } catch (err) {
          alert(err);
          console.log(err);
        }      
    }


  return (
    <div class="firstpage">

    <div class="login-box">
        <h1>Login</h1>
        <form onSubmit={login}> 
            <div class="text_field">
                      <input
                          type="text"
                          required
                          onChange={(event)=>{setLoginEmail(event.target.value)}}
                      
                      />
                <span></span>
                <label>Email</label>
            </div>
            <div class="text_field">
                      <input
                          type="password"
                          required
                          onChange={(event) => { setLoginPassword(event.target.value) }}
                      />
                <span></span>
                <label>Password</label>
            </div>
                  <input type="submit" value="Login" />
                  <div class="signup_link">
                    Not a member? <a onClick={newSignup}>Signup</a>
                </div>
            
        </form>
    </div>

</div>
  )
}

export default Login