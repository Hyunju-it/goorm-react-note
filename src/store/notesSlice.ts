import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Note, NotesState, Priority, BackgroundColor } from '../types';

const defaultNoteId = uuidv4();

const initialState: NotesState = {
  notes: [{
    id: defaultNoteId,
    title: '제목...',
    content: '',
    tags: [],
    priority: 'Low',
    backgroundColor: 'White',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }],
  activeNoteId: defaultNoteId,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote: (state) => {
      const newNote: Note = {
        id: uuidv4(),
        title: '제목...',
        content: '',
        tags: [],
        priority: 'Low',
        backgroundColor: 'White',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.notes.push(newNote);
      state.activeNoteId = newNote.id;
    },
    updateNoteTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const note = state.notes.find(n => n.id === action.payload.id);
      if (note) {
        note.title = action.payload.title;
        note.updatedAt = new Date().toISOString();
      }
    },
    updateNoteContent: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const note = state.notes.find(n => n.id === action.payload.id);
      if (note) {
        note.content = action.payload.content;
        note.updatedAt = new Date().toISOString();
      }
    },
    updateNotePriority: (state, action: PayloadAction<{ id: string; priority: Priority }>) => {
      const note = state.notes.find(n => n.id === action.payload.id);
      if (note) {
        note.priority = action.payload.priority;
        note.updatedAt = new Date().toISOString();
      }
    },
    updateNoteBackground: (state, action: PayloadAction<{ id: string; backgroundColor: BackgroundColor }>) => {
      const note = state.notes.find(n => n.id === action.payload.id);
      if (note) {
        note.backgroundColor = action.payload.backgroundColor;
        note.updatedAt = new Date().toISOString();
      }
    },
    addTag: (state, action: PayloadAction<{ id: string; tag: string }>) => {
      const note = state.notes.find(n => n.id === action.payload.id);
      if (note && !note.tags.includes(action.payload.tag)) {
        note.tags.push(action.payload.tag);
        note.updatedAt = new Date().toISOString();
      }
    },
    removeTag: (state, action: PayloadAction<{ id: string; tag: string }>) => {
      const note = state.notes.find(n => n.id === action.payload.id);
      if (note) {
        note.tags = note.tags.filter(tag => tag !== action.payload.tag);
        note.updatedAt = new Date().toISOString();
      }
    },
    setActiveNote: (state, action: PayloadAction<string>) => {
      state.activeNoteId = action.payload;
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
      if (state.activeNoteId === action.payload) {
        state.activeNoteId = state.notes.length > 0 ? state.notes[0].id : null;
      }
    },
  },
});

export const {
  createNote,
  updateNoteTitle,
  updateNoteContent,
  updateNotePriority,
  updateNoteBackground,
  addTag,
  removeTag,
  setActiveNote,
  deleteNote,
} = notesSlice.actions;

export default notesSlice.reducer;