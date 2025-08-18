interface LogoutButtonProps {
  logout: () => void;
}

export default function LogoutButton({ logout }: LogoutButtonProps) {
  return (
    <button onClick={logout}>
      <p className="btn-login mt-2 font-light">log out</p>
    </button>
  );
}
