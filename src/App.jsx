import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './pages/Login';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Article from './pages/Article';
import CreateArticle from './pages/CreateArticle';
import AdminRoute from './components/AdminRoute/AdminRoute';
import AdminPage from './pages/AdminPage';
import TagPage from'./components/TagPage/TagPage';
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
              <Route path="/tag/:tagName" element={<TagPage />} />
            </Routes>
          </main>
        <Footer />
    </Router>
  )
}

export default App