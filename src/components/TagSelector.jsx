import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/TagSelector.css';

const availableTags = ['Software Development', 'JavaScript', 'Python', 'Coding', 'Data', 'AI', 'QA', 'UI', 'UX'];

const TagSelector = ({ selectedTags, setSelectedTags }) => {
  const [customTag, setCustomTag] = useState('');

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag)) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag('');
    }
  };

  return (
    <div className="tag-selector">
      <h3>Select Tags</h3>
      <div className="tag-list">
        {availableTags.map(tag => (
          <button
            key={tag}
            className={selectedTags.includes(tag) ? 'tag selected' : 'tag'}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="custom-tag">
        <input
          type="text"
          placeholder="Add custom tag..."
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
        />
        <button onClick={addCustomTag}>Add</button>
      </div>
      <div className="selected-tags">
        <h4>Selected Tags:</h4>
        {selectedTags.length > 0 ? (
          selectedTags.map(tag => (
            <span key={tag} className="selected-tag">{tag} ✖</span>
          ))
        ) : (
          <p>No tags selected</p>
        )}
      </div>
    </div>
  );
};

TagSelector.propTypes = {
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedTags: PropTypes.func.isRequired,
};

export default TagSelector;