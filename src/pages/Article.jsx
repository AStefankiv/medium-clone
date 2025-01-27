import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import '../styles/Article.css';
import ArticleEditor from '../components/ArticleEditor';
import db from '../firebase/firebase';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';

const Article = () => {
  const { id } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

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
    try {
      const docRef = doc(db, 'articles', id);
      await setDoc(docRef, updatedArticle);
      setArticleData(updatedArticle);
      setIsEditing(false);
      console.log('Document updated successfully!');
    } catch (e) {
      console.error('Error updating article:', e);
    }
  };

  const handleToggleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const docRef = doc(db, 'articles', id);
      await deleteDoc(docRef);
      console.log('Document deleted successfully!');
      navigate('/');
    } catch (e) {
      console.error('Error deleting article:', e);
    }
  };

  return (
    <div className="article">
      {articleData ? (
        <>
        {!isEditing ? (
          <div className='read-mode'>
            <h1 className="article-title">{articleData.title}</h1>
            <p className="article-description">{articleData.description}</p>

            <div
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(articleData.content),
                }}
              ></div>
            
            <button onClick={handleToggleEdit}>✏️ Edit</button>
          </div>
        ) : (
          <div className='edit-mode'>
            <ArticleEditor article={articleData} onSave={handleSave} onCancel={handleCancelEdit} onDelete={handleDelete} />
            </div>
        )}
        </>
      ) : (
        <p>Article not found</p>
      )}
    </div>
  );
}

export default Article;