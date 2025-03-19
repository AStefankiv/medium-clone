import { useEffect, useState } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const querySnapshot = await getDocs(collection(db, 'articles'));
      const articlesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articlesList);
      setLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>All Articles</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {articles.length === 0 ? (
            <p>No articles available.</p>
          ) : (
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleList;