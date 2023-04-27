import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
// import app from "./config";
import { auth, database } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

//2.
export const AuthContext = createContext();

//3.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);

      console.log(user);
      //const docRef = doc(database, "users", `${user.email}`);
      //const docSnap = getDoc(docRef);
      getDoc(doc(database, "users", user.email)).then((docSnap) => {
        if (docSnap.exists()) {
          setName(docSnap.data().username);
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      });
      // getDoc(doc(db, "users", user.email)).then(docSnap => {
      // if (docSnap.exists()) {
      //   setName(docSnap.data());
      // } else {
      //   // docSnap.data() will be undefined in this case
      //   console.log("No such document!");
      // }
    });
  }, []);
  // const userSignOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       console.log("sign out successful");
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <AuthContext.Provider value={{ user, name }}>
      {children}
    </AuthContext.Provider>
  );
};
