import PropTypes from 'prop-types';
import '../styles/CommentCard.css';

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <div className="comment-card__author">
        <p>👤 <strong>Author:</strong> {comment.author ? comment.author.email : "Unknown"}</p>
        <p>📆 {comment.date}</p>
      </div>
      <div className="comment-card__content">
        <p>{comment.text}</p>
      </div>
    </div>
  )
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    author: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default CommentCard;