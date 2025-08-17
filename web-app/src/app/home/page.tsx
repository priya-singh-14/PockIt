"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProfile } from "../hooks/fetchProfile";
import LogOutButton from "../components/logout";

export default function HomePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data.profile);
      } catch (err: any) {
        if (err.message === "Not authenticated") {
          router.push("/");
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!profile) return null;

  return (
    <div>
      <h2>Welcome, {profile.email || profile.id}!</h2>
      <LogOutButton></LogOutButton>
    </div>
  );
}
