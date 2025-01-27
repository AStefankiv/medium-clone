import { useNavigate } from 'react-router-dom';
import ArticleEditor from '../components/ArticleEditor';
import { collection, addDoc } from 'firebase/firestore';
import db from '../firebase/firebase';
import '../styles/CreateArticle.css';

const CreateArticle = () => {
  const navigate = useNavigate();

  const handleSave = async (newArticle) => {
    try {
      // Save the new article to Firebase Firestore
      const docRef = await addDoc(collection(db, 'articles'), newArticle);
      console.log('New article added with ID:', docRef.id);
      alert('Article created successfully!');
      navigate('/'); // Redirect to the homepage or any desired route
    } catch (error) {
      console.error('Error adding article:', error);
      alert('Failed to create the article. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to the homepage or any desired route
  };

  return (
    <div className="create-article-page">
      <h1>Create a New Article</h1>
      <ArticleEditor article={{ title: '', description: '', content: '' }} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default CreateArticle;