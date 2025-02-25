import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ArticleEditor from '../components/ArticleEditor';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import '../styles/CreateArticle.css';
import { useAuth } from '../context/AuthContext';
import TagSelector from '../components/TagSelector';

const CreateArticle = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSave = async (newArticle) => {

    const slugify = (title) => {
      return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+/, '')
    };
    
    try {
      const slug = slugify(newArticle.title);
      const docRef = doc(db, 'articles', slug);
    
      const updatedArticle = {
      title: newArticle.title || 'Untitled',
      description: newArticle.description || 'No description',
      content: newArticle.content || '<p>No content</p>',
      imageUrl: newArticle.imageUrl || '',
      tags: selectedTags,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      author: user ? { id: user.uid, email: user.email } : null,
    };

    await setDoc(docRef, updatedArticle);
      navigate('/');

    } catch (error) {
      console.error('Error adding article:', error.message);
      alert('Failed to create the article. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="create-article-page">
      <h1>Create a New Article</h1>
      <ArticleEditor article={{ title: '', description: '', content: '' }} onSave={handleSave} onCancel={handleCancel} />
      <TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
    </div>
  );
};

export default CreateArticle;