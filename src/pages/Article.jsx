import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import '../styles/Article.css';
import ArticleEditor from '../components/ArticleEditor';
import db from '../firebase/firebase';

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = (doc(db, 'articles', id));
      console.log('docRef:', docRef);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArticleData({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such document!');
      }
    };

    fetchArticle();
  }, [id]);

  const handleSave = async (updatedArticle) => {
    console.log('Updated article:', updatedArticle.content);
    setArticleData(updatedArticle);
    navigate(`/article/${id}`);

    try {
      const docRef = doc(db, 'articles', id);
      await setDoc(docRef, updatedArticle);
      console.log('Article updated in Firebase:', docRef.id);
    } catch (e) {
      console.error('Error updating article:', e);
    }
  };



  return (
    <div className="article">
      {articleData ? (
        <>
          <h1 className="article-title">{articleData.title}</h1>
          <p className="article-description">{articleData.description}</p>
          <ArticleEditor article={articleData} onSave={handleSave} />
        </>
      ) : (
        <p>Article not found</p>
      )}
    </div>
  );
}

export default Article;