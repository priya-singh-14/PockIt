import { useState } from "react";
import { redirectTo } from "../utils/redirectSignUp";

interface LoginCardProps {
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}


function LoginCard({ login, loading, error }: LoginCardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="w-[400px] p-4 flex flex-col justify-center">
      <h2
        className="text-center my-4 font-[var(--font-noto)] text-[var(--text-h2--size)]"
        style={{ color: "var(--color-blue-dark)", fontWeight: "400" }}
      >
        Bento
      </h2>
      <h3
        className="mt-4 mb-8 font-[var(--font-noto)] text-[var(--text-h2--size)] font-light"
        style={{ color: "var(--color-blue-dark)" }}
      >
        Log In
      </h3>

      <form className="w-full" onSubmit={handleLogin}>
        <div className="flex flex-col gap-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="border-b focus:outline-none"
            style={{
              fontFamily: "var(--font-inconsolata)",
              fontSize: "var(--text-p-size)",
              color: "var(--color-grey-primary)",
              borderColor: "var(--color-grey-primary)",
            }}
            required
          />
          <label
            className="text-sm mb-3"
            style={{
              fontFamily: "var(--font-inconsolata)",
              fontSize: "var(--text-h5-size)",
              color: "var(--color-grey-primary)",
            }}
          >
            email
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
            className="border-b focus:outline-none"
            style={{
              fontFamily: "var(--font-inconsolata)",
              fontSize: "var(--text-p-size)",
              color: "var(--color-grey-primary)",
              borderColor: "var(--color-grey-primary)",
            }}
            required
          />
          <label
            className="text-sm"
            style={{
              fontFamily: "var(--font-inconsolata)",
              fontSize: "var(--text-h5-size)",
              color: "var(--color-grey-primary)",
            }}
          >
            password
          </label>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        <button type="submit" className="w-full mt-6" disabled={loading}>
          <p className="btn-login mt-2 font-light">
            {loading ? "Logging in..." : "log in"}
          </p>
        </button>

        <p
          className="text-center mt-3 hover:text-black"
          style={{
            fontFamily: "var(--font-inconsolata)",
            fontSize: "var(--text-h5-size)",
            color: "var(--color-grey-primary)",
          }}
        >
          <button
            onClick={() => redirectTo("http://localhost:3000/")}
            className="hover:underline"
          >
            <p className="my-4 font-[var(--font-noto)] font-light">
              Don't have an account? Sign Up
            </p>
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginCard;
