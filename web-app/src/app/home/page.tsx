import LogOut from '../components/logout';

export default async function HomePage() {
  return (
    <div className='w-full'>
      <div className='text-right p-10'>
      <h3 className='font-inconsolata text-h3'>Welcome!</h3>
      <LogOut></LogOut></div>
    </div>
  );
}