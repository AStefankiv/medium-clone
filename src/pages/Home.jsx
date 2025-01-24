import '../styles/Home.css';
import ArticleCard from '../components/ArticleCard';
import { articles } from '../data/Articles';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase/firebase';
import { useEffect, useState } from 'react';

const Home = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const querySnapshot = await getDocs(collection(db, 'articles'));
    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
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

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Medium Clone</h1>
        <p>Explore articles, stories, and ideas from the community.</p>
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