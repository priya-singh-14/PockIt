import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { auth } from "../firebase.js";
import { useRouter } from "next/navigation";

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


function LoginCard ({ onSwitch }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError("");
  
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setAuthCookie(userCredential.user);
        router.push("/home");
      } catch (error) {
        const errorMessages = {
          'auth/user-not-found': 'No account exists with this email address.',
          'auth/wrong-password': 'Incorrect password. Please try again.',
          'auth/too-many-requests': 'Too many login attempts. Please try again later.',
          'auth/invalid-email': 'The email address is not valid.',
          'auth/invalid-credential': 'The email or password you entered is incorrect.',
          'default': 'An unexpected error occurred. Please try again.'
        };
  
        const errorMessage = errorMessages[error.code] || errorMessages['default'];
        
        setError(errorMessage);
      }
    };
  
    return (
      <div className="h-screen w-full flex bg-primary">
        <div className="border border-starYellow w-4/5 ml-24 my-10 flex justify-left p-10  bg-tan">
          <div className="w-full">
            <h2 className="text-whitePrimary text-h2 font-pixel mb-6">Log In</h2>
            <div className="bg-primary text-brown">
            {error && <p className="p-2 font-inconsolata">{error}</p>}</div>
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

  export default LoginCard