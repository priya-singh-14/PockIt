import supabase from "../utils/supabaseClient";
import Cookies from "js-cookie";

export const useLogout = (setLoggedIn: (val: boolean) => void) => {
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      Cookies.remove("auth_token");
      setLoggedIn(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return { logout };
};
