import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase.js";
import { useRouter } from "next/navigation";

function SigninCard({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      const errorMessages = {
        "auth/email-already-in-use":
          "An account with this email already exists.",
        "auth/invalid-email": "The email address is not valid.",
        "auth/weak-password":
          "Password is too weak. Please use a stronger password.",
        "auth/operation-not-allowed":
          "User registration is currently disabled.",
        "auth/invalid-password": "The password is invalid or too simple.",
        default:
          "An unexpected error occurred during signup. Please try again.",
      };
      const errorMessage =
        errorMessages[error.code] || errorMessages["default"];

      setError(errorMessage);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-3/5 flex flex-wrap my-20">
        <h2 className="text-blackPrimary text-h2 my-20 font-noto font-light">
          Sign Up
        </h2>
        <div className="bg-primary text-greyPrimary text-center">
            {error && <p className="text-p mt-3 font-inconsolata text-red-800">{error}</p>}
          </div>
        <form className="w-full" onSubmit={handleSignIn}>
          <div className="w-full">
            <input
              type="email"
              className="mb-2 w-full text-h5 font-light font-inconsolata bg-transparent placeholder-brown text-greyPrimary border-b border-greyPrimary focus:outline-none"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="font-inconsolata text-lightGrey text-h5">
              email
            </label>

            <input
              type="password"
              className="mb-2 mt-10 w-full text-h5 font-light text-greyPrimary font-inconsolata bg-transparent placeholder-brown border-b border-greyPrimary focus:outline-none"
              placeholder="create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="font-inconsolata text-lightGrey text-h5 mb-1">
              password
            </label>
            <input
              type="password"
              className="mb-2 mt-10 w-full text-h5 font-light text-greyPrimary font-inconsolata bg-transparent placeholder-brown border-b border-greyPrimary focus:outline-none"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="font-inconsolata text-lightGrey text-h5 mb-1">
              confirm password
            </label>
          </div>
          <div className="w-full">
            <button type="submit" className="w-full">
              <h3 className="rounded-lg mt-10 text-h3 bg-blueDark text-whitePrimary text-sm p-2 font-inconsolata hover:bg-blackPrimary ">
                sign up
              </h3>
            </button>
          </div>
          <p className="text-h5 text-greyPrimary text-center mt-24 font-inconsolata text-sm hover:text-black">
            <button onClick={onSwitch}>Already have an account? Log In</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SigninCard;
