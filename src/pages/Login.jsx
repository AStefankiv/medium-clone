import { useState } from 'react';
import { signIn, signUp, logOut } from '../firebase/auth';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);
  const { user, role, loading } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      await signIn(email, password);
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      await signUp(email, password, isAdmin);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='login-form'>
      {!user ? (
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isSignUp && role === 'admin' && (
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              /> Create as Admin
            </label>
          )}

          <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
          <button 
            type="button" 
            onClick={() => { setIsSignUp((prev) => !prev); setError(null); }}>
            {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
          </button>
        </form>
      ) : (
        <>
          <p className='logged-in'>User <span className="user-email">{user.email}</span> signed in</p>
          {role === 'admin' && <p className='admin'>🔒 Admin</p>}
          <button onClick={handleLogOut}>🔓 Sign Out</button>
        </>
      )}

      {error && <p className='error'>{error}</p>}
    </div>
  );
};

export default Login;