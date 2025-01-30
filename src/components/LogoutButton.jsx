import { logOut } from "../firebase/auth";

const LogoutButton = () => {
  return (
    <button className="" onClick={logOut}>🔓 Log out</button>
  );
};

export default LogoutButton;