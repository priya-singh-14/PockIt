"use client";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/current-user`, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
          if (!res.ok) throw new Error("Unauthorized");
          const data = await res.json();
          setUser(data.user);
        } catch (err) {
          setUser(null);
          setError(err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, loading, error };
}
