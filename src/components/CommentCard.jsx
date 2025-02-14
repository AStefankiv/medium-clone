import PropTypes from 'prop-types';
import '../styles/CommentCard.css';

const CommentCard = ({ comment, onEdit, onDelete }) => {
  return (
    <div className="comment-card">
      <div className="comment-card__author">
        <p>👤 <strong>Author:</strong> {comment.author ? comment.author.email : "Unknown"}</p>
        <p>📆 {comment.date}</p>
      </div>
      <div className="comment-card__content">
        <p>{comment.text}</p>
      </div>
        {onEdit && (
          <button className="edit-button" onClick={() => onEdit(comment)}>📝 Edit</button>
        )}
        {onDelete && (
          <button className="delete-button" onClick={() => onDelete(comment)}>❌ Delete</button>
        )}
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
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

export default CommentCard;