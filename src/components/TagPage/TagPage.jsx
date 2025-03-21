import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../ArticleCard/ArticleCard';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import './TagPage.scss';

const TagPage = () => {
  const { tagName } = useParams();
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchArticlesByTag = async () => {
      const q = query(
        collection(db, 'articles'),
        where('tags', 'array-contains', tagName),
      );
      const querySnapshot = await getDocs(q);
      const articlesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articlesList);
      setLoading(false);
    };

    fetchArticlesByTag();
  }, [tagName]);

  return (
    <div className="tag-page">
      <h1>Articles with the tag: {tagName}</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="articles-container">
          {articles.length > 0 ? (
            articles.map((article) => (
              (user && user.uid === article.author.id) || user?.role === 'admin' || article.isPublic ? (
                <ArticleCard key={article.id} article={article} />
              ) : null
            ))
          ) : (
            <p className="no-articles">No articles found with the tag: {tagName}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TagPage;