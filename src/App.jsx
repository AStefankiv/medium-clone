import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      <Footer />
    </Router>
  )
}

export default App