import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { openEditor, deleteNote, togglePinNote } from '../store/notesSlice';
import { Note } from '../types';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSortChange: (sortType: string) => void;
  currentSort: string;
}

const SortModal: React.FC<SortModalProps> = ({ isOpen, onClose, onSortChange, currentSort }) => {
  if (!isOpen) return null;

  return (
    <div className="sort-modal-overlay" onClick={onClose}>
      <div className="sort-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sort-modal-header">
          <h3>정렬</h3>
          <button className="clear-btn">CLEAR</button>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="sort-section">
          <h4>PRIORITY</h4>
          <div className="sort-options">
            <label>
              <input
                type="radio"
                name="priority"
                value="lowToHigh"
                checked={currentSort === 'lowToHigh'}
                onChange={(e) => onSortChange(e.target.value)}
              />
              Low to High
            </label>
            <label>
              <input
                type="radio"
                name="priority"
                value="highToLow"
                checked={currentSort === 'highToLow'}
                onChange={(e) => onSortChange(e.target.value)}
              />
              High to Low
            </label>
          </div>
        </div>

        <div className="sort-section">
          <h4>DATE</h4>
          <div className="sort-options">
            <label>
              <input
                type="radio"
                name="date"
                value="latest"
                checked={currentSort === 'latest'}
                onChange={(e) => onSortChange(e.target.value)}
              />
              Sort by Latest
            </label>
            <label>
              <input
                type="radio"
                name="date"
                value="created"
                checked={currentSort === 'created'}
                onChange={(e) => onSortChange(e.target.value)}
              />
              Sort by Created
            </label>
            <label>
              <input
                type="radio"
                name="date"
                value="edited"
                checked={currentSort === 'edited'}
                onChange={(e) => onSortChange(e.target.value)}
              />
              Sort by Edited
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state: RootState) => state.notes);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('latest');
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchTerm === '' ||
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortType) {
      case 'lowToHigh':
        const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'highToLow':
        const priorityOrderDesc = { 'Low': 1, 'Medium': 2, 'High': 3 };
        return priorityOrderDesc[b.priority] - priorityOrderDesc[a.priority];
      case 'created':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'edited':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'latest':
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  const pinnedNotes = sortedNotes.filter(note => note.isPinned);
  const unpinnedNotes = sortedNotes.filter(note => !note.isPinned);

  const handleNoteClick = (noteId: string) => {
    dispatch(openEditor(noteId));
  };

  const handleEditNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(openEditor(noteId));
  };

  const handleDeleteNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteNote(noteId));
  };

  const handlePinNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(togglePinNote(noteId));
  };

  const formatDate = (dateString: string) => {
    return dateString.replace(/\s/g, ' ');
  };

  const getBackgroundClass = (backgroundColor: string) => {
    return `bg-${backgroundColor.toLowerCase()}`;
  };

  const renderNoteCard = (note: Note) => (
    <div
      key={note.id}
      className={`note-card ${getBackgroundClass(note.backgroundColor)}`}
      onClick={() => handleNoteClick(note.id)}
    >
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-priority-pin">
          <span className="priority">{note.priority}</span>
          <button
            className={`pin-btn ${note.isPinned ? 'pinned' : ''}`}
            onClick={(e) => handlePinNote(note.id, e)}
          >
            📌
          </button>
        </div>
      </div>

      <div
        className="note-content-preview"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      <div className="note-tags">
        {note.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      <div className="note-card-footer">
        <span className="note-date">{formatDate(note.updatedAt)}</span>
        <div className="note-actions">
          <button
            className="action-btn"
            onClick={(e) => handleEditNote(note.id, e)}
          >
            ✏️
          </button>
          <button
            className="action-btn"
            onClick={(e) => handleDeleteNote(note.id, e)}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="main-content">
      <div className="content-header">
        <h2>Notes</h2>
        <button
          className="add-note-btn"
          onClick={() => dispatch(openEditor(null))}
        >
          +
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="노트의 제목을 입력해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          className="search-btn"
          onClick={() => setIsSortModalOpen(true)}
        >
          정렬
        </button>
      </div>

      {pinnedNotes.length > 0 && (
        <div className="notes-section">
          <h3>Pinned Notes ({pinnedNotes.length})</h3>
          <div className="notes-grid">
            {pinnedNotes.map(renderNoteCard)}
          </div>
        </div>
      )}

      {unpinnedNotes.length > 0 && (
        <div className="notes-section">
          <h3>All Notes ({unpinnedNotes.length})</h3>
          <div className="notes-grid">
            {unpinnedNotes.map(renderNoteCard)}
          </div>
        </div>
      )}

      {sortedNotes.length === 0 && (
        <div className="empty-state">
          <p>노트가 없습니다.</p>
        </div>
      )}

      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        onSortChange={setSortType}
        currentSort={sortType}
      />
    </div>
  );
};

export default MainContent;