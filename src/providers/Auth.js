import React, { useEffect, useState } from "react";
import firebase from "../firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentProfile, setCurrentProfile] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
    if (currentUser !== null) {
      const fetchData = async () => {
        const db = firebase.firestore();
        await db
          .doc(`users/${currentUser.uid}`)
          .get()
          .then(doc => {
            setCurrentProfile(doc.data());
          })
          .catch((err) =>{
            console.log(err)
          });
      };
      fetchData();
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentProfile,
        setCurrentProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
