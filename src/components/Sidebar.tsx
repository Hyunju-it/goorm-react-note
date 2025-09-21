import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { openEditor, deleteNote, togglePinNote } from '../store/notesSlice';
import { Note } from '../types';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { notes, tagList } = useSelector((state: RootState) => state.notes);
  const [selectedTag, setSelectedTag] = useState<string>('Notes');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchTerm === '' ||
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedTag === 'Notes') return matchesSearch;
    if (selectedTag === 'Archive') return false; // 아카이브 기능은 미구현
    if (selectedTag === 'Trash') return false; // 휴지통 기능은 미구현

    return matchesSearch && note.tags.includes(selectedTag);
  });

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);

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

      <div className="sidebar-content">
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
          <button className="search-btn">정렬</button>
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

        {filteredNotes.length === 0 && (
          <div className="empty-state">
            <p>노트가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;