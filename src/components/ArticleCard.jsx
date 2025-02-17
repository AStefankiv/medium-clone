import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/ArticleCard.css';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      {/* {article.imageUrl ? (<img src={article.imageUrl} alt={article.title || "Article image"} className="article-image" />
      ) : ( <p className="no-image">No image available</p>)} */}
      <div className="article-card-footer">
        <p>👤 <strong>Author:</strong> {article.author ? article.author.email : "Unknown"}</p>
        <p>📆 Published on: {article.date}</p>
        <Link to={`/article/${article.id}`}>Read more</Link>
      </div>
    </div>
  )
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    author: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }),
    imageUrl: PropTypes.string,
  }).isRequired,
}

export default ArticleCard;