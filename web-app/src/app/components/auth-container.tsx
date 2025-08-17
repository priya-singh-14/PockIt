"use client";

import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import LoginCard from "./loginCard";
import SigninCard from "./signinCard";
import Cookies from "js-cookie";

const setAuthCookie = (accessToken: string | null) => {
  if (accessToken) {
    Cookies.set("authToken", accessToken, {
      sameSite: "strict",
      expires: 0.25,
    });
  } else {
    Cookies.remove("authToken");
  }
};

const AuthContainer = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthCookie(session?.access_token || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return isLoggingIn ? (
    <SigninCard onSwitch={() => setIsLoggingIn(false)} />
  ) : (
    <LoginCard onSwitch={() => setIsLoggingIn(true)} />
  );
};

export default AuthContainer;
