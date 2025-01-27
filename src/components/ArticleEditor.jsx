import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';
import '../styles/ArticleEditor.css';

const ArticleEditor = ({ article, onSave }) => {
  const [content, setContent] = useState(article ? article.content : '');
  const [title, setTitle] = useState(article ? article.title : '');
  const [description, setDescription] = useState(article ? article.description : '');

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    console.log('newContent:', newContent);
  };
  
  const handleSave = async () => {
    const updatedArticle = {
      id: article ? article.id : Date.now(),
      title,
      description,
      content,
    };
    await onSave(updatedArticle);
    alert('Article saved successfully!');
  };

  useEffect(() => {
    if (article) {
      setContent(article.content);
      setTitle(article.title);
      setDescription(article.description);
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
      <button onClick={handleSave}>Save Article</button>
    </div>
  );
}

ArticleEditor.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
}

export default ArticleEditor;