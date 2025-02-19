import PropTypes from 'prop-types';
import '../styles/CommentCard.css';

import { useAuth } from '../context/AuthContext';

const CommentCard = ({ comment, onEdit, onDelete }) => {
  const { user } = useAuth();
  return (
    <div className="comment-card">
      <div className="comment-card__author">
        <p>👤 <strong>Author:</strong> {comment.author ? comment.author.email : "Unknown"}</p>
        <p>📆 {comment.date}</p>
      </div>
      <div className="comment-card__content">
        <p>{comment.text}</p>
      </div>
      <div className="button-group">
        {user && user.uid === comment.author.id && (
          <>
        {onEdit && (
          <button className="edit-button-card" onClick={() => onEdit(comment)}>📝 Edit</button>
        )}
        {onDelete && (
          <button className="delete-button-card" onClick={() => onDelete(comment)}>❌ Delete</button>
        )}
        </>
      )}
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
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

export default CommentCard;