"use client";

import { useState } from "react";
import { useLogin } from "../hooks/useLogIn";

function LoginCard({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-3/5 flex flex-wrap my-20">
        <h2 className="text-blackPrimary text-h2 my-20 font-noto font-light">
          Log In
        </h2>
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
            <button onClick={onSwitch} className="hover:underline">
              Don't have an account? Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginCard;
