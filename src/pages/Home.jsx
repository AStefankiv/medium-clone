import '../styles/Home.css';
import ArticleCard from '../components/ArticleCard';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const fetchArticles = async () => {
    const articleRef = query(collection(db, 'articles'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(articleRef);

    const articles = await Promise.all(querySnapshot.docs.map(async (doc) => {
      const articleData = { id: doc.id, ...doc.data() };

      const commentRef = query(collection(db, 'articles', doc.id, 'comments'), orderBy('date', 'desc'));
      const commentSnapshot = await getDocs(commentRef);
      articleData.comments = commentSnapshot.size;

      return articleData;
    }
    ));
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