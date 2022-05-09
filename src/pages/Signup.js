import React from "react";
import "./Logsign.css";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseAuth";

function Signup() {
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");

  // const [user, setUser] = React.useState("");

  const history = useHistory();

  function loginPage() {
    history.push("/");
  }

  // const register = (event) => {
  //   event.preventDefault();
  //   createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
  //     .catch((err) => {
  //       alert(err);
  //       console.error(err);
  //     })
  //     .then((response) => {
  //       // setUser(response);
  //       history.push("/notebook");
  //     })
  // };
  //using this method redirected to notebook page even after signup error like when password is less then 6 characters


  const register = async (event) => {
    event.preventDefault();
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          registerEmail, registerPassword
        );
        // setUser(response);
        history.push("/notebook");
      } catch (err) {
        alert(err);
        console.log(err);
      }      
  }





  return (
    <div class="firstpage">
      <div class="login-box">
        <h1>Signup</h1>
        <form onSubmit={register}>
          <div class="text_field">
            <input
              type="text"
              required
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
            <span></span>
            <label>Email</label>
          </div>

          <div class="text_field">
            <input
              type="password"
              required
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />
            <span></span>
            <label>Password</label>
          </div>
          <input type="submit" value="Signup" />
          <div class="signup_link">
            Have an account? <a onClick={loginPage}>Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
