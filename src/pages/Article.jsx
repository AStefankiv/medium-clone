import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc, getDocs, setDoc, addDoc, deleteDoc, collection } from 'firebase/firestore';
import '../styles/Article.css';
import ArticleEditor from '../components/ArticleEditor/ArticleEditor';
import { db } from '../firebase/firebase';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import CommentCard from '../components/CommentCard/CommentCard';
import { useAuth } from '../context/AuthContext';
import { TagFilled } from '@ant-design/icons';
import { HeartOutlined } from '@ant-design/icons';
import { HeartFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { PlusCircleOutlined } from '@ant-design/icons';

const Article = () => {
  //User & Article state:
  const { id } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { user, role } = useAuth();
  const navigate = useNavigate();
  //Comment state:
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingComment, setEditingComment] = useState('');
  //Likes state:
  const [likes, setLikes] = useState([]);

  //Article:
  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, 'articles', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArticleData({ id: docSnap.id, ...docSnap.data(), tags: docSnap.data().tags || [] });
      } else {
        console.log('No such document!');
      }
    };

    if (user) {
      fetchArticle();
    }
  }, [id, user]);

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
    if (user && (user.uid === articleData.author.id || role === 'admin'))
      setIsEditing(true);
    else
      alert('You are not authorized to edit this article');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  //create a variable with routes
  const homeRoute = '/';

  const handleDelete = async () => {
    try {
      const docRef = doc(db, 'articles', id);
      await deleteDoc(docRef);
      console.log('Document deleted successfully!');
      navigate(homeRoute);
    } catch (e) {
      console.error('Error deleting article:', e);
    }
  };

  // Comments:
  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = collection(doc(db, 'articles', id), 'comments');
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
    } catch (error) {
      console.error('Error adding comment:', error);
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

  const handleDeleteComment = async (comment) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
    if (!confirmDelete) return;
    try {
      const commentRef = doc(db, 'articles', id, 'comments', comment.id);
      await deleteDoc(commentRef);
      setComments(comments.filter((c) => c.id !== comment.id));
    } catch (e) {
      console.error('Error deleting comment:', e);
    }
  };

  //Likes:
  useEffect(() => {
    if (articleData) {
      setLikes(articleData.likes || []);
    }
  }
  , [articleData, user]);

  const handleLike = async () => {
    if (!user) {
      alert('Please sign in to like this article');
      return;
    }

    const articleRef = doc(db, 'articles', id);

    if (likes.includes(user.uid)) {
      const updatedLikes = likes.filter((like) => like !== user.uid);
      setLikes(updatedLikes);
      await setDoc(articleRef, { likes: updatedLikes }, { merge: true });
    } else {
      const updatedLikes = [...likes, user.uid];
      setLikes(updatedLikes);
      await setDoc(articleRef, { likes: updatedLikes }, { merge: true });
    }
  };
  return (
    <div className="article-page">
      <div className="article">
        {articleData ? (
          <>
          {!isEditing ? (
            <div className='read-mode'>
              <div className="read-mode-like">
              <div className="article-title-container">
                <h1 className="article-title">{articleData.title}</h1>
                <button onClick={handleLike} className="like-button">
                  {likes.includes(user?.uid) ?
                  (<HeartFilled style={{ color: '#f44336', fontSize: '24px' }} />)
                  :
                  (<HeartOutlined style={{ color: '#f44336', fontSize: '24px' }} />)
                  }
                </button>
              </div>
              </div>
              <h1 className="line"></h1>
              <p className="article-description">{articleData.description}</p>
              {articleData.imageUrl && (
                <img
                  src={articleData.imageUrl}
                  alt={articleData.title || "Article image"}
                  className="article-image"
                />
              )}
              <div
                  className="article-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(articleData.content),
                  }}
                ></div>
                {/*Tags*/}
                <div className="tags">
                  <h2><TagFilled style={{fontSize: '20px', color: '#389e0d'}}/>Tags:</h2>
                  {articleData?.tags?.length > 0 ? (
                    articleData.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))
                  ) : (
                    <p>No tags available</p>
                  )}
                </div>
              <div className='edit-button'>
              {user && (user.uid === articleData.author.id || role === 'admin') && (
                <Button
                type="primary"
                onClick={handleToggleEdit}
                style={{height: '50px'}}
                >
                <EditFilled
                style={{
                fontSize: '20px',
                color: '#b5f5ec',
                }}
                />Edit
                </Button>
              )}
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
          {comments.length !== 0 ? (
            comments.map((comment) => (
              editingCommentId === comment.id ? (
                <div key={comment.id} className="edit-comment">
                  <div className="text-area">
                    <textarea
                      value={editingComment}
                      onChange={(e) => setEditingComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="save-delete-buttons">
                    <button onClick={() => handleSaveComment(comment.id)}>Save</button>
                  <button onClick={() => handleDeleteComment(comment)}>❌ Delete</button>
                  </div>
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
              <button onClick={handleAddComment}><PlusCircleOutlined />Add Comment</button>
            </div>
          )}
        </div>
    </div>
  );
}

export default Article;