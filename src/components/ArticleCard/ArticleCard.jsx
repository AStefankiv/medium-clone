import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ArticleCard.scss';
import { TagFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  const handleTagClick = (tag) => {
    navigate(`/tag/${tag}`);
  }

  return (
    <div className="article-card">
        <div className="title-description-footer">
        <h2>{article.title}</h2>
        <p>{article.description}</p>
        <div className="article-card-footer">
          <p>👤 <strong>Author:</strong> {article.author ? article.author.email : "Unknown"}</p>
          {article.tags && (
            <div className="article-card-tags">
              <h3><TagFilled style={{fontSize: '20px', color: '#389e0d'}}/>Tags:</h3>
              {article.tags.map((tag) => (
                <span
                key={tag}
                className="tag"
                onClick={() => handleTagClick(tag)}
                >
                {tag}</span>
              ))}
            </div>
          )}
          <p>💬 {article.comments || 0}</p>
          <p>📆 Published on: {article.date}</p>
        </div>
        </div>
        <Link to={`/article/${article.id}`}>
        <div className="article-image">
        {article.imageUrl ? (
          <img src={article.imageUrl} alt={article.title || "Article image"} className="article-image" />
        ) : (
        <p className="no-image">No image available</p>
      )}
        </div>
      </Link>
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
    tags: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.number.isRequired,
  }).isRequired,
}

export default ArticleCard;