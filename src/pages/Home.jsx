import '../styles/Home.css';
import ArticleCard from '../components/ArticleCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const fetchArticles = async () => {
    const querySnapshot = await getDocs(collection(db, 'articles'));
    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return articles;
  }

  useEffect(() => {
    const loadArticles = async () => {
      const data = await fetchArticles();
      setArticles(data);
    };
    loadArticles();
  }, []);

  const handleCreateArticle = async () => {
    navigate('/create-article');
  }

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Medium Clone</h1>
        <p>Explore articles, stories, and ideas from the community.</p>

        <div className="home-header__create-article">
          <button onClick={handleCreateArticle}>📝 Create Article</button>
        </div>
      </header>

      <main className="home-main">
        {articles.length > 0 ? (
          <div className="articles-list">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p>Loading articles...</p>
        )}
      </main>
    </div>
  )
}

export default Home;