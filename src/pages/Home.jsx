import '../styles/Home.css';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from 'antd';
import { EditFilled } from '@ant-design/icons';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

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
          <Button
          type="primary"
          onClick={handleCreateArticle}
          >
            <EditFilled
            style={{
              fontSize: '20px',
              color: '#b5f5ec',
              }}
            />Create Article
            </Button>
        </div>
      </header>

      <main className="home-main">
        {articles.length > 0 ? (
          <div className="articles-list">
            {articles.map((article) => (
              (user && user.uid === article.author.id) || article.isPublic ? (
                <ArticleCard key={article.id} article={article} />
              ) : null
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