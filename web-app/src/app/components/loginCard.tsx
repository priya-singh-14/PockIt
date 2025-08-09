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

function LoginCard({ onSwitch }) {
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
        "auth/user-not-found": "No account exists with this email address.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/too-many-requests":
          "Too many login attempts. Please try again later.",
        "auth/invalid-email": "The email address is not valid.",
        "auth/invalid-credential":
          "The email or password you entered is incorrect.",
        default: "An unexpected error occurred. Please try again.",
      };

      const errorMessage =
        errorMessages[error.code] || errorMessages["default"];

      setError(errorMessage);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-3/5 flex flex-wrap my-20">
        <h2 className="text-blackPrimary text-h2 my-20 font-noto font-light">Log In</h2>
        <div className="bg-primary text-blackPrimary">
          {error && <p className="p-2 font-inconsolata">{error}</p>}
        </div>
        <form className="w-full" onSubmit={handleLogin}>
          <div className="w-full">
            <input
              type="email"
              className="mb-2 w-full text-h5 font-light font-inconsolata bg-transparent placeholder-brown text-greyPrimary border-b border-greyPrimary focus:outline-none"
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
              className="mb-2 mt-10 w-full text-h5 font-light text-greyPrimary font-inconsolata bg-transparent placeholder-brown border-b border-greyPrimary focus:outline-none"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="font-inconsolata text-lightGrey text-h5 mb-1">
              password
            </label>
          </div>
          <div className="w-full">
            <button type="submit" className="w-full">
              <h3 className="rounded-lg mt-10 text-h3 bg-blueDark text-whitePrimary text-sm p-2 font-inconsolata hover:bg-blackPrimary">
                log in
              </h3>
            </button>
          </div>
          <p className=" text-h5 text-greyPrimary text-center mt-48 font-inconsolata text-sm hover:text-black">
            <button onClick={onSwitch} className="hover:underline">Don't have an account? Sign Up</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginCard;
