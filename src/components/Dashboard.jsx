import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
    </div>
  );
};

export default Dashboard;