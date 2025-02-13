import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc, getDocs, setDoc, addDoc, deleteDoc, collection } from 'firebase/firestore';
import '../styles/Article.css';
import ArticleEditor from '../components/ArticleEditor';
import { db } from '../firebase/firebase';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import CommentCard from '../components/CommentCard';
import { useAuth } from '../context/AuthContext';

const Article = () => {
  const { id } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingComment, setEditingComment] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = (doc(db, 'articles', id));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArticleData({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such document!');
      }
    };

    if (user !== undefined) {
      fetchArticle();
    }
  }, [id, user]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = collection(db, 'articles', id, 'comments');
      const commentSnap = await getDocs(commentsRef);
      const commentsList = commentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsList);
    };

    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      alert('Comment cannot be empty');
      return;
    }

    try {
      const commentsRef = collection(db, 'articles', id, 'comments');
      const newCommentData = {
        text: newComment,
        author: user ? { id: user.uid, email: user.email } : { email: 'Anonymous' },
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };

      const docRef = await addDoc(commentsRef, newCommentData);
      setComments([...comments, { id: docRef.id, ...newCommentData }]);
      setNewComment('');
      window.location.reload();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

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
    if (user && user.uid === articleData.author.id)
      setIsEditing(true);
    else
      alert('You are not authorized to edit this article');
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

  const handleEditComment = (comment) => {
    if (user && user.uid === comment.author.id) {
      setEditingCommentId(comment.id);
      setEditingComment(comment.text);
    } else {
      alert('You are not authorized to edit this comment');
    }
  };

  const handleSaveComment = async (commentId) => {
    if (editingComment.trim() === '') {
      alert('Comment cannot be empty');
      return;
    }

    try {
      const commentRef = doc(db, 'articles', id, 'comments', commentId);
      await setDoc(commentRef, { text: editingComment }, { merge: true });

      const updatedComments = comments.map((comment) =>
        comment.id === commentId ? { ...comment, text: editingComment } : comment
      );

      setComments(updatedComments);
      setEditingCommentId(null);
      setEditingComment('');
    }
    catch (e) {
      console.error('Error updating comment:', e);
    }
  };

  return (
    <div className="article-page">
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
              <div className='edit-button'>
              <button onClick={handleToggleEdit}>✏️ Edit</button>
              </div>
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
        <div className="comments">
          <h2>Comments</h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              editingCommentId === comment.id ? (
                <div key={comment.id} className="edit-comment">
                  <textarea
                    value={editingComment}
                    onChange={(e) => setEditingComment(e.target.value)}
                  ></textarea>
                  <button onClick={() => handleSaveComment(comment.id)}>Save</button>
                </div>
              ) : (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onEdit={() => handleEditComment(comment)}
                />
              )
            ))
          ) : (
            <p>No comments yet</p>
          )}

          {user && (
            <div className="add-comment">
              <textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button onClick={handleAddComment}>➕ Add Comment</button>
            </div>
          )}
        </div>
    </div>
  );
}

export default Article;