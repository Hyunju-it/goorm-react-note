import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setActiveNote, deleteNote } from '../store/notesSlice';

const Sidebar: React.FC = () => {
  const { notes, activeNoteId } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();

  const handleNoteClick = (noteId: string) => {
    dispatch(setActiveNote(noteId));
  };

  const handleDeleteNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(deleteNote(noteId));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}`;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Notes</h2>
      </div>
      <div className="notes-list">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`note-item ${activeNoteId === note.id ? 'active' : ''}`}
            onClick={() => handleNoteClick(note.id)}
          >
            <div className="note-item-content">
              <div className="note-title">{note.title}</div>
              <div className="note-date">{formatDate(note.updatedAt)}</div>
              <div className="note-preview">
                {note.content.substring(0, 50)}
                {note.content.length > 50 ? '...' : ''}
              </div>
              <div className="note-tags">
                {note.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              className="delete-btn"
              onClick={(e) => handleDeleteNote(note.id, e)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;