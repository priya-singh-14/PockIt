"use client";

// think about abstracting auth and these helper functions to a utils folder for s.o.c
import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      console.log("User Signed Up:", userCredential.user);
    } catch (error) {
      console.error("Error Signing Up:", error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      console.log("User Logged In:", userCredential.user);
    } catch (error) {
      console.error("Error Logging In:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User Logged Out");
    } catch (error) {
      console.error("Error Logging Out:", error.message);
    }
  };

  return (
    <div className="h-screen w-full flex bg-primary">
      <div className="w-1/2 flex flex-col justify-center items-center relative">
        <h1 className="text-starYellow text-h2 font-pixel absolute top-6 left-6">
          starred
        </h1>
        <div className="relative mx-auto">
          <img
            src="star.svg"
            className="transform animate-spin transition-transform ease-in-out"
          ></img>
        </div>
        <div className="absolute overflow-hidden h-screen bottom-0 left-0">
          <img src="blur.svg" className="bottom-0 left-0"></img>
        </div>
        <p className="text-whitePrimary text-md absolute left-10 bottom-6">
          Download Our Chrome Extension
        </p>
      </div>

      <div className="border border-starYellow w-2/5 ml-28 mr-5 my-10 flex justify-left p-10  bg-tan">
        <div className="w-full">
          <h2 className="text-whitePrimary text-h2 font-pixel mb-6">Log In</h2>
          <form className="w-[350px]">
            <input
              type="email"
              className="mt-6 w-full text-h5 font-inconsolata bg-transparent text-whitePrimary border-b border-whitePrimary focus:outline-none focus:border-starYellow"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="font-inconsolata text-lightGrey text-h5">
              email
            </label>

            <input
              type="password"
              className="mt-16 w-full text-h5 text-white font-inconsolata bg-transparent border-b border-white focus:outline-none focus:border-starYellow"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="font-inconsolata text-lightGrey text-h5 mb-1">
              password
            </label>
          </form>
          <div className="flex flex justify-end">
            <button>
              <h2 className="z-20 text-h3 flex bg-starYellow text-black px-4 py-2 font-inconsolata shadow-lg hover:bg-primary">
                Login
              </h2>
              {/* eventully add another svg or gif here */}
            </button>
          </div>
          <p className="text-h5 text-lightGrey font-inconsolata text-sm mt-4 text-right">
            or Sign Up
            {/* make this a button to prompt sign up */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
