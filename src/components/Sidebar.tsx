import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setSelectedTag } from '../store/notesSlice';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { tagList, selectedTag } = useSelector((state: RootState) => state.notes);

  const handleTagSelect = (tag: string) => {
    dispatch(setSelectedTag(tag));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Keep</h1>
      </div>

      <div className="sidebar-menu">
        <div
          className={`menu-item ${selectedTag === 'Notes' ? 'active' : ''}`}
          onClick={() => handleTagSelect('Notes')}
        >
          💡 Notes
        </div>

        {tagList.map(tag => (
          <div
            key={tag}
            className={`menu-item ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => handleTagSelect(tag)}
          >
            🏷️ {tag}
          </div>
        ))}

        <div
          className={`menu-item ${selectedTag === 'Edit Notes' ? 'active' : ''}`}
          onClick={() => handleTagSelect('Edit Notes')}
        >
          ✏️ Edit Notes
        </div>

        <div
          className={`menu-item ${selectedTag === 'Archive' ? 'active' : ''}`}
          onClick={() => handleTagSelect('Archive')}
        >
          📦 Archive
        </div>

        <div
          className={`menu-item ${selectedTag === 'Trash' ? 'active' : ''}`}
          onClick={() => handleTagSelect('Trash')}
        >
          🗑️ Trash
        </div>
      </div>
    </div>
  );
};

export default Sidebar;