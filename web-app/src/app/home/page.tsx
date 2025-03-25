import { cookies } from 'next/headers';
import { getCurrentUser } from '../utils/serverAuth';
import LogOut from '../components/logout';

export default async function HomePage() {
  const cookieStore = cookies();
  const user = await getCurrentUser(cookieStore);
  
  // middleware should handle this
  if (!user) {
    return <div>You need to be logged in to view this page.</div>;
  }
  
  return (
    <div className='w-full'>
      <div className='text-right p-10'>
      <h2 className='font-inconsolata text-h2'>Welcome, {user.email}!</h2>
      <LogOut></LogOut></div>
    </div>
  );
}