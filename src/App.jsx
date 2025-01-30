import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';

import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Article from './pages/Article';
import CreateArticle from './pages/CreateArticle';
import './App.css'

function App() {
  return (
    <Router>
        <Header />
          <div className="main-content">
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Home />} />
              <Route path="/create-article" element={<CreateArticle />} />
              <Route path="/login" element={<Login />} />
              <Route path="/article/:id" element={<Article />} />
            </Routes>
          </div>
        <Footer />
    </Router>
  )
}

export default App