import Cookies from "js-cookie";

export const fetchProfile = async () => {
  const token = Cookies.get("authToken");
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch profile");
  }

  return res.json();
};
