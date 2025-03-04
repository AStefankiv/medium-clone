import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/ArticleCard.css';

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/article/${article.id}`}>
      <div className="article-card">
        <div className="title-description-footer">
        <h2>{article.title}</h2>
        <p>{article.description}</p>
        <div className="article-card-footer">
          <p>👤 <strong>Author:</strong> {article.author ? article.author.email : "Unknown"}</p>
          {article.tags && (
            <div className="article-card-tags">
              <h3>📑Tags:</h3>
              {article.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
          <p>💬 {article.comments || 0}</p>
          <p>📆 Published on: {article.date}</p>
        </div>
        </div>
        <div className="article-image">
        {article.imageUrl ? (<img src={article.imageUrl} alt={article.title || "Article image"} className="article-image" />
        ) : ( <p className="no-image">No image available</p>)}
        </div>
      </div>
    </Link>
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
    tags: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.number.isRequired,
  }).isRequired,
}

export default ArticleCard;