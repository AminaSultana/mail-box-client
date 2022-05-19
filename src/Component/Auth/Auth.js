import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/redux-hooks";

import { authActions } from "../../store/auth";
import classes from "./Auth.module.css";

const Auth = () => {
  const navigate=useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const dispatch= useAppDispatch()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!isLogin) {
      let enteredConfirmPassword = confirmPasswordInputRef.current.value;
      if (enteredPassword !== enteredConfirmPassword) {
        alert("Password did not match");
        passwordInputRef.current.value = "";
        confirmPasswordInputRef.current.value = "";
        return;
      }
    }

    let url;
    if (!isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4FndLe69ZmBRZxkpjHR00HITI91M0fDA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4FndLe69ZmBRZxkpjHR00HITI91M0fDA";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      /*  if(!isLogin){
        navigate(`/emailconfirmation?token=${data.idToken}`)
      } */

      if (isLogin) {
        dispatch(authActions.login(data.idToken))
        localStorage.setItem("token", data.idToken);
        let newEmailString = enteredEmail.replace(/[@.]/gi, "");
        localStorage.setItem("email", newEmailString);
        navigate("/home");
        return;
      }
      setIsLogin(true);
      passwordInputRef.current.value = "";
      emailInputRef.current.value = "";
      setIsLoading(true);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  let content = <p>Create New User</p>;
  if (isLoading) {
    content = "Sending request";
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              required
              ref={confirmPasswordInputRef}
            />
          </div>
        )}
        <div className={classes.actions}>
          <button type="submit">{isLogin ? "Login" : content}</button>
          {isLogin && <Link to={"/password-reset"}>Forgot password?</Link>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "New user? Sign Up" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Auth;
