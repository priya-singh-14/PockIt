"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import { deleteCookie } from "cookies-next";

function LogOut() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      deleteCookie("authToken");
      router.push("/");
      router.refresh(); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="font-inconsolata text-brown hover:underline hover:text-starYellow"
    >
      Log Out
    </button>
  );
}

export default LogOut;
