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
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
    >
      Log Out
    </button>
  );
}

export default LogOut;
