import './index.css';
import LoginCard from './components/loginCard';
import Dashboard from "./components/dashboard";
import { useLogin } from './hooks/useLogin';
import { useLogout } from './hooks/useLogout';
import { useState } from 'react';
import Cookies from 'js-cookie';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get("auth_token"));

  const { login, error, loading } = useLogin(setLoggedIn);
  const { logout } = useLogout(setLoggedIn);

  return (
    <>
      {loggedIn ? (
        <Dashboard logout={logout} />
      ) : (
        <LoginCard login={login} error={error} loading={loading} />
      )}
    </>
  );
}

export default App;
