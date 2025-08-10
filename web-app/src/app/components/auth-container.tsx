"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "/src/firebase.js";

import LoginCard from "./loginCard.tsx";
import SigninCard from "./signinCard.tsx";

const setAuthCookie = async (user: User) => {
  if (user) {
    const token = await user.getIdToken();
    // set cookie
    document.cookie = `authToken=${token}; path=/; max-age=18000; SameSite=Strict`;
  } else {
    // clear cookie
    document.cookie = "authToken=; path=/; max-age=0";
  }
};

const AuthContainer = () => {
  const [isLoggingIn, setisLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      await setAuthCookie(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {isLoggingIn ? (
        <SigninCard onSwitch={() => setisLoggingIn(false)} />
      ) : (
        <LoginCard onSwitch={() => setisLoggingIn(true)} />
      )}
    </div>
  );
};

export default AuthContainer;
