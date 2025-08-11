"use client";

import LogOut from '../components/logout';
import { useCurrentUser } from '../hooks/getCurrentUser';

export default function HomePage() {
  const { user, loading, error } = useCurrentUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user info.</div>;

  return (
    <div className='w-full'>
      <div className='text-right p-10'>
        <h3 className='font-inconsolata text-h3'>
          Welcome{user ? `, ${user.email}` : '!'}
        </h3>
        <LogOut />
      </div>
    </div>
  );
}
