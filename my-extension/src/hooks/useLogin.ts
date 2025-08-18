import { useState } from "react";
import supabase from "../utils/supabaseClient";
import Cookies from "js-cookie";

export const useLogin = (setLoggedIn: (val: boolean) => void) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) throw loginError;

      const token = data.session?.access_token;
      if (!token) throw new Error("No access token available");

      Cookies.set("auth_token", token, { expires: 0.25 });
      setLoggedIn(true);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
};
