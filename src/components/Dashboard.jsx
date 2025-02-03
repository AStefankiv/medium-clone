// import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  // const [user, loading] = useAuthState(auth);
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  // if (!user) return <p>No user logged in</p>;

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
    </div>
  );
};

export default Dashboard;