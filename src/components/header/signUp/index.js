import React, { useState, useCallback } from "react";
import firebase from "../../../firebase";
import "./styles.scss";

const SignUp = () => {
  // const [email, setEmail] = useState("");
  // const [password, SetPassword] = useState("");
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  var facebookProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();

      const { email, password } = event.target.elements;

      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
      } catch (error) {
        try {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);
        } catch (error) {
          alert(error);
        }
      }
    },
    [
      // email, password
    ]
  );

  const providerSignIn = provider => {
    firebase.auth().signInWithRedirect(provider);
  };

  return (
    <form onSubmit={handleSignUp} className="signup">
      <div
        className="signup__facebook signup__external"
        onClick={() => {
          providerSignIn(facebookProvider);
        }}
      >
        Facebook login
      </div>
      <div
        className="signup__google signup__external"
        onClick={() => {
          providerSignIn(googleProvider);
        }}
      >
        Google login
      </div>

      <input
        className="signup__input signup__input--email"
        name="email"
        type="email"
        placeholder="Signup/Login email"
        autoComplete="email"
      />

      <input
        className="signup__input signup__input--password"
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="password"
      />

      <button type="submit" className="signup__button">
        &rarr;
      </button>
    </form>
  );
};

export default SignUp;
