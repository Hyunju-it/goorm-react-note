import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateNoteTitle, updateNoteContent, updateNotePriority, updateNoteBackground, addTag } from '../store/notesSlice';
import FormatToolbar from './FormatToolbar';

const NoteEditor: React.FC = () => {
  const { notes, activeNoteId } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  const activeNote = notes.find(note => note.id === activeNoteId);

  useEffect(() => {
    if (contentEditableRef.current && activeNote) {
      contentEditableRef.current.innerHTML = activeNote.content;
    }
  }, [activeNote?.id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeNote) {
      dispatch(updateNoteTitle({ id: activeNote.id, title: e.target.value }));
    }
  };

  const handleContentChange = () => {
    if (activeNote && contentEditableRef.current) {
      const content = contentEditableRef.current.innerHTML;
      dispatch(updateNoteContent({ id: activeNote.id, content }));
    }
  };

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleContentChange();
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (activeNote) {
      dispatch(updateNotePriority({
        id: activeNote.id,
        priority: e.target.value as 'High' | 'Medium' | 'Low'
      }));
    }
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (activeNote) {
      dispatch(updateNoteBackground({
        id: activeNote.id,
        backgroundColor: e.target.value as any
      }));
    }
  };

  const handleAddTag = () => {
    if (activeNote && tagInputRef.current && tagInputRef.current.value.trim()) {
      dispatch(addTag({ id: activeNote.id, tag: tagInputRef.current.value.trim() }));
      tagInputRef.current.value = '';
    }
  };


  if (!activeNote) {
    return (
      <div className="note-editor">
        <div className="no-note-selected">
          노트를 선택하거나 새로 만들어주세요.
        </div>
      </div>
    );
  }

  return (
    <div className="note-editor-card">
      <div className="card-header">
        <h3>노트 생성하기</h3>
      </div>

      <div className="note-title-section">
        <input
          type="text"
          value={activeNote.title}
          onChange={handleTitleChange}
          className="note-title-input"
          placeholder="제목..."
        />
      </div>

      <FormatToolbar onFormat={handleFormat} />

      <div
        ref={contentEditableRef}
        contentEditable
        className="note-content"
        onInput={handleContentChange}
        suppressContentEditableWarning={true}
      />

      <div className="note-footer">
        <div className="left-section">
          <button onClick={handleAddTag} className="add-tag-btn">
            Add Tag
          </button>
        </div>

        <div className="right-section">
          <div className="option">
            <label>배경색 :</label>
            <select value={activeNote.backgroundColor} onChange={handleBackgroundChange}>
              <option value="White">White</option>
              <option value="Yellow">Yellow</option>
              <option value="Pink">Pink</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
            </select>
          </div>

          <div className="option">
            <label>우선순위 :</label>
            <select value={activeNote.priority} onChange={handlePriorityChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card-actions">
        <button className="create-note-btn" onClick={() => window.dispatchEvent(new CustomEvent('createNote'))}>
          + 생성하기
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;