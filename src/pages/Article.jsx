// import { useParams, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { articles } from '../data/Articles';
// import '../styles/Article.css';
// import ArticleEditor from '../components/ArticleEditor';

// const Article = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [articleData, setArticleData] = useState(
//     articles.find((article) => article.id === parseInt(id))
//   );

//   const handleSave = (updatedArticle) => {
//     console.log('Updated article:', updatedArticle.content);
//     setArticleData(updatedArticle);
//     navigate(`/article/${id}`);
//   }

//   return (
//     <div className="article">
//       {articleData ? (
//         <ArticleEditor article={articleData} onSave={handleSave} />
//       ) : (
//         <p>Article not found</p>
//       )}
//     </div>
//   );
// }

// export default Article;




import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { articles } from '../data/Articles';
import '../styles/Article.css';
import ArticleEditor from '../components/ArticleEditor';
import { collection, addDoc } from 'firebase/firestore';
import db from '../firebase/firebase';

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState(
    articles.find((article) => article.id === parseInt(id))
  );

  // const handleSave = (updatedArticle) => {
  //   console.log('Updated article:', updatedArticle.content);
  //   setArticleData(updatedArticle);
  //   navigate(`/article/${id}`);
  // }

  const handleSave = async (updatedArticle) => {
    console.log('Updated article:', updatedArticle.content);
    setArticleData(updatedArticle);
    navigate(`/article/${id}`);

    try {
      const docRef = await addDoc(collection(db, 'articles'), updatedArticle);
      console.log('Document written with ID:', docRef.id);
    } catch (e) {
      console.error('Error adding document:', e);
    }
  }



  return (
    <div className="article">
      {articleData ? (
        <ArticleEditor article={articleData} onSave={handleSave} />
      ) : (
        <p>Article not found</p>
      )}
    </div>
  );
}

export default Article;