"use client";

// think about abstracting auth and these helper functions to a utils folder for s.o.c
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase.js";
import { useRouter } from "next/navigation";

const LoginCard = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (error: unknown) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen w-full flex bg-primary">
      <div className="border border-starYellow w-4/5 ml-24 my-10 flex justify-left p-10  bg-tan">
        <div className="w-full">
          <h2 className="text-whitePrimary text-h2 font-pixel mb-6">Log In</h2>
          {error && <p className="text-red-500 font-inconsolata">{error}</p>}
          <form className="w-full" onSubmit={handleLogin}>
            <div className="w-[350px]">
              <input
                type="email"
                className="mt-6 w-full text-h5 font-inconsolata bg-transparent placeholder-brown text-whitePrimary border-b border-whitePrimary focus:outline-none focus:border-starYellow"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="font-inconsolata text-lightGrey text-h5">
                email
              </label>

              <input
                type="password"
                className="mt-16 w-full text-h5 text-whitePrimary font-inconsolata bg-transparent placeholder-brown border-b border-white focus:outline-none focus:border-starYellow"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="font-inconsolata text-lightGrey text-h5 mb-1">
                password
              </label>
            </div>
            <div className="flex flex justify-end">
              <button type="submit">
                <h2 className="mt-40 z-20 text-h3 flex bg-starYellow text-black px-4 py-2 font-inconsolata shadow-lg hover:bg-blue-100">
                  Login
                </h2>
              </button>
            </div>
          </form>
          <p className="text-h5 text-lightGrey font-inconsolata text-sm mt-4 text-right hover:text-black">
            <button onClick={onSwitch}>or Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
};

const SigninCard = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: unknown) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen w-full flex bg-primary">
      <div className="border border-starYellow w-4/5 ml-24 my-10 flex justify-left p-10  bg-tan">
        <div className="w-full">
          <h2 className="text-whitePrimary text-h2 font-pixel mb-6">Log In</h2>
          {error && <p className="text-red-500 font-inconsolata">{error}</p>}
          <form className="w-full" onSubmit={handleSignIn}>
            <div className="w-[350px]">
              <input
                type="email"
                className="mt-6 w-full text-h5 font-inconsolata bg-transparent placeholder-brown text-whitePrimary border-b border-whitePrimary focus:outline-none focus:border-starYellow"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="font-inconsolata text-lightGrey text-h5">
                email
              </label>

              <input
                type="password"
                className="mt-16 w-full text-h5 text-whitePrimary font-inconsolata bg-transparent placeholder-brown border-b border-white focus:outline-none focus:border-starYellow"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="font-inconsolata text-lightGrey text-h5 mb-1">
                password
              </label>
            </div>
            <div className="flex flex justify-end">
              <button type="submit">
                <h2 className="mt-40 z-20 text-h3 flex bg-starYellow text-black px-4 py-2 font-inconsolata shadow-lg hover:bg-blue-100">
                  Sign Up
                </h2>
              </button>
            </div>
          </form>
          <p className="text-h5 text-lightGrey font-inconsolata text-sm mt-4 text-right hover:text-black">
            <button onClick={onSwitch}>or Log in</button>
          </p>
        </div>
      </div>
    </div>
  );
};

const AuthContainer = () => {
  const [isLoggingIn, setisLoggingIn] = useState(false);
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
