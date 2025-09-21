import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { openEditor } from '../store/notesSlice';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { tagList } = useSelector((state: RootState) => state.notes);
  const [selectedTag, setSelectedTag] = useState<string>('Notes');

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Keep</h1>
      </div>

      <div className="sidebar-menu">
        <div
          className={`menu-item ${selectedTag === 'Notes' ? 'active' : ''}`}
          onClick={() => setSelectedTag('Notes')}
        >
          💡 Notes
        </div>

        {tagList.map(tag => (
          <div
            key={tag}
            className={`menu-item ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => setSelectedTag(tag)}
          >
            🏷️ {tag}
          </div>
        ))}

        <div
          className={`menu-item ${selectedTag === 'Edit Notes' ? 'active' : ''}`}
          onClick={() => setSelectedTag('Edit Notes')}
        >
          ✏️ Edit Notes
        </div>

        <div
          className={`menu-item ${selectedTag === 'Archive' ? 'active' : ''}`}
          onClick={() => setSelectedTag('Archive')}
        >
          📦 Archive
        </div>

        <div
          className={`menu-item ${selectedTag === 'Trash' ? 'active' : ''}`}
          onClick={() => setSelectedTag('Trash')}
        >
          🗑️ Trash
        </div>
      </div>
    </div>
  );
};

export default Sidebar;