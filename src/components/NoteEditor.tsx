import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addNote, updateNote, closeEditor, addTag } from '../store/notesSlice';
import { BackgroundColor, Priority } from '../types';
import FormatToolbar from './FormatToolbar';

interface TagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  availableTags: string[];
  selectedTags: string[];
}

const TagModal: React.FC<TagModalProps> = ({
  isOpen,
  onClose,
  onAddTag,
  onRemoveTag,
  availableTags,
  selectedTags
}) => {
  const [newTag, setNewTag] = useState('');

  const handleAddNewTag = () => {
    if (newTag.trim() && !availableTags.includes(newTag.trim())) {
      onAddTag(newTag.trim());
      setNewTag('');
    }
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onRemoveTag(tag);
    } else {
      onAddTag(tag);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="tag-modal-overlay">
      <div className="tag-modal">
        <div className="tag-modal-header">
          <h3>ADD Tags</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="tag-input-section">
          <input
            type="text"
            placeholder="new tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddNewTag()}
          />
        </div>

        <div className="tag-list">
          {availableTags.map(tag => (
            <div key={tag} className="tag-item">
              <span>{tag}</span>
              <button
                className={`tag-action-btn ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleTagToggle(tag)}
              >
                {selectedTags.includes(tag) ? '×' : '+'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NoteEditor: React.FC = () => {
  const dispatch = useDispatch();
  const { isEditorOpen, selectedNoteId, notes, tagList } = useSelector((state: RootState) => state.notes);

  const selectedNote = selectedNoteId ? notes.find(note => note.id === selectedNoteId) : null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [backgroundColor, setBackgroundColor] = useState<BackgroundColor>('White');
  const [priority, setPriority] = useState<Priority>('Low');
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setTags(selectedNote.tags);
      setBackgroundColor(selectedNote.backgroundColor as BackgroundColor);
      setPriority(selectedNote.priority);
    } else {
      setTitle('');
      setContent('');
      setTags([]);
      setBackgroundColor('White');
      setPriority('Low');
    }
  }, [selectedNote]);

  const handleFormat = (command: string, value?: string) => {
    if (contentRef.current) {
      contentRef.current.focus();
      document.execCommand(command, false, value);
    }
  };

  const handleSave = () => {
    const noteData = {
      title: title || '제목...',
      content: contentRef.current?.innerHTML || '',
      tags,
      backgroundColor,
      priority,
      isPinned: selectedNote?.isPinned || false
    };

    if (selectedNote) {
      dispatch(updateNote({ ...selectedNote, ...noteData }));
    } else {
      dispatch(addNote(noteData));
    }

    dispatch(closeEditor());
  };

  const handleAddTag = (tag: string) => {
    if (!tagList.includes(tag)) {
      dispatch(addTag(tag));
    }
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const backgroundColorOptions: BackgroundColor[] = ['White', 'Red', 'Green', 'Blue', 'Yellow', 'Pink'];
  const priorityOptions: Priority[] = ['Low', 'Medium', 'High'];

  if (!isEditorOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="note-editor-modal">
        <div className="note-editor-header">
          <h2>노트 생성하기</h2>
          <button className="close-btn" onClick={() => dispatch(closeEditor())}>×</button>
        </div>

        <div className="note-editor-body">
          <input
            type="text"
            className="note-title-input"
            placeholder="제목..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <FormatToolbar onFormat={handleFormat} />

          <div
            ref={contentRef}
            className={`note-content-editor bg-${backgroundColor.toLowerCase()}`}
            contentEditable
            suppressContentEditableWarning
            dangerouslySetInnerHTML={{ __html: content }}
            onInput={(e) => setContent((e.target as HTMLDivElement).innerHTML)}
          />

          <div className="note-editor-controls">
            <button
              className="add-tag-btn"
              onClick={() => setIsTagModalOpen(true)}
            >
              Add Tag
            </button>

            <div className="select-group">
              <label>배경색 :</label>
              <select
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value as BackgroundColor)}
              >
                {backgroundColorOptions.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>

            <div className="select-group">
              <label>우선순위 :</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                {priorityOptions.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <button className="save-btn" onClick={handleSave}>
            + 생성하기
          </button>
        </div>
      </div>

      <TagModal
        isOpen={isTagModalOpen}
        onClose={() => setIsTagModalOpen(false)}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        availableTags={tagList}
        selectedTags={tags}
      />
    </div>
  );
};

export default NoteEditor;