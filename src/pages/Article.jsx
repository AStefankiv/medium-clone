import { useParams } from 'react-router-dom';
import { articles } from '../data/Articles';
import '../styles/Article.css';

const Article = () => {
  const { id } = useParams();
  const article = articles.find((article) => article.id === Number(id));

  return (
    <div className="article">
      {article ? (
        <>
          <h1>{article.title}</h1>
          <p>{article.content}</p>
        </>
      ) : (
        <p>Article not found</p>
      )}
    </div>
  );
}

export default Article;