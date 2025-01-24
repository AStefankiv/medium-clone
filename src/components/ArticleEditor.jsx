import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';
import '../styles/ArticleEditor.css';

const ArticleEditor = ({ article, onSave }) => {
  const [content, setContent] = useState(article.content);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    console.log('newContent:', newContent);
  };
  
  const handleSave = async () => {
    const updatedArticle = {...article, content};
    await onSave(updatedArticle);
    alert('Article saved!');
  };

  return (
    <div className="article-editor">
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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
}

export default ArticleEditor;