import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';
import '../styles/ArticleEditor.css';

const ArticleEditor = ({ article, onSave, onCancel, onDelete }) => {
  const [content, setContent] = useState(article ? article.content : '');
  const [title, setTitle] = useState(article ? article.title : '');
  const [description, setDescription] = useState(article ? article.description : '');
  const [date, setDate] = useState(article ? article.date : new Date().toLocaleDateString());

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };
  
  const handleSave = async () => {
    const updatedArticle = {
      id: article ? article.id : title.toLowerCase().replace(/[^a-z0-9-]/g, ''),
      title,
      description,
      content,
      date,
    };
    await onSave(updatedArticle);
    alert('Article saved successfully!');
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleDelete = async () => {
    await onDelete(article.id);
    alert('Article deleted successfully!');
  };

  useEffect(() => {
    if (article) {
      setContent(article.content);
      setTitle(article.title);
      setDescription(article.description);
      setDate(article.date);
    }
  }, [article]);

  return (
    <div className="article-editor">

    <div className="title-description">
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className='article-title'
      />
      <textarea
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className='article-description'
      />
    </div>

      <Editor
        apiKey="ya17n7heyu718a0qj9q0uug85h1jiucgqc4yi15ln56o4itu"
        value={content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat'
        }}
        onEditorChange={handleEditorChange}
      />
      <div className="save-cancel-buttons">
        <button onClick={handleSave}>💾 Save Article</button>
        <button onClick={handleCancel}>❌ Cancel</button>
        <button onClick={handleDelete}>🗑️ Delete Article</button>
      </div>
    </div>
  );
}

ArticleEditor.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ArticleEditor;