import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../supabaseClient";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) throw loginError;

      const token = data.session?.access_token;
      if (!token) throw new Error("No access token available");

      // // Create profile if it doesn’t exist
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      router.push("/home");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
};
