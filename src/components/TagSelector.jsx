import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/TagSelector.css';

const availableTags = ['Software Dev', 'JavaScript', 'Python', 'Coding', 'Data', 'AI', 'QA', 'UI', 'UX'];

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

  const removeTag = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  return (
    <div className="tag-selector">
      <h3>Select Tags</h3>

      {/* Available Tags */}
      <div className="available-tags">
        {availableTags.map(tag => (
          <button
            key={tag}
            className={selectedTags.includes(tag) ? 'tag-button selected' : 'tag-button'}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="custom-selected-tags">
      {/* Custom Tag Input */}
        <div className="custom-tag">
          <input
            type="text"
            placeholder="Add custom tag..."
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
          />
          <button onClick={addCustomTag}>Add</button>
        </div>

        {/* Selected Tags */}
        <div className="selected-tags">
          <h4>Selected Tags:</h4>
          {selectedTags.length > 0 ? (
            selectedTags.map(tag => (
              <span key={tag} className="selected-tag">
                {tag}
                <button className="remove-tag-btn" onClick={() => removeTag(tag)}>✖</button>
              </span>
            ))
          ) : (
            <p className="no-tags">No tags selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

TagSelector.propTypes = {
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedTags: PropTypes.func.isRequired,
};

export default TagSelector;