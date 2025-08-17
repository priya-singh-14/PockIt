import { useLogout } from "../hooks/useLogout";

function LogOutButton() {
  const logout = useLogout();

  return (
    <button
      onClick={logout}
      className="font-inconsolata text-brown hover:underline"
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
