import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Article from './pages/Article';
import CreateArticle from './pages/CreateArticle';
import AdminRoute from './components/AdminRoute';
import AdminPage from './pages/AdminPage';
import './App.css'

function App() {
  return (
    <Router>
        <Header />
          <main className="main-content">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
              path="/create-article"
              element={
                <ProtectedRoute>
                  <CreateArticle />
                </ProtectedRoute>
              }
              />
              <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
              />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/article/:id" element={<Article />} />
            </Routes>
          </main>
        <Footer />
    </Router>
  )
}

export default App