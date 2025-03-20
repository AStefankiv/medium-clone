import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../ArticleCard/ArticleCard';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const TagPage = () => {
  const { tagName } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log('tagName:', tagName);
    const fetchArticlesByTag = async () => {
      const q = query(
        collection(db, 'articles'),
        console.log('articles:', collection(db, 'articles')),
        where('tags', 'array-contains', tagName),
        // console.log('tagName:', tagName)
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
    <div>
      <h1>Articles with the tag: {tagName}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {articles.length === 0 ? (
            <p>No articles found with the tag {tagName}.</p>
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

export default TagPage;
