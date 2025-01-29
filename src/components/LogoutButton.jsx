import { logOut } from "../firebase/auth";

const LogoutButton = () => {
  return <button onClick={logOut}>Log out</button>;
};

export default LogoutButton;