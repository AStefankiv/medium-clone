import { useAuth } from '../context/AuthContext';
import { logOut } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const homePath = '/';

  const handleLogout = async () => {
    await logOut();
    navigate(homePath); // Redirect to home after logout
  };

  if (role !== 'admin') {
    return <p>Unauthorized Access</p>;
  }

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome, <strong>{user?.email}</strong> 👋</p>{/* replace with svg */}
      <p>You have admin privileges.</p>

      <button onClick={handleLogout} className="logout-btn">🔓 Log Out</button>
    </div>
  );
};

export default AdminPage;