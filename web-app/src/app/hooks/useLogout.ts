"use client";

import { useRouter } from "next/navigation";
import supabase from "../../supabaseClient";
import Cookies from "js-cookie";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await supabase.auth.signOut();

      // Remove auth cookie
      Cookies.remove("authToken");

      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return logout;
};
