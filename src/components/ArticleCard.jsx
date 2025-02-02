import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/ArticleCard.css';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h2>{article.title}</h2>
      <p>{article.description}</p>
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
    author: PropTypes.string.isRequired,
  }).isRequired,
}

export default ArticleCard;