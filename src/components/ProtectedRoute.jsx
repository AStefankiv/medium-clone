// import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  // const [user] = useAuthState(auth);
  const { user, loading } = useAuth();
  console.log("ProtectedRoute -> user", user)

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;