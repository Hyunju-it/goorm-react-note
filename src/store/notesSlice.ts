import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, NoteState } from '../types';
import { v4 as uuidv4 } from 'uuid';

const initialState: NoteState = {
  notes: [],
  selectedNoteId: null,
  isEditorOpen: false,
  tagList: ['Coding', 'Exercise', 'Quotes'],
  selectedTag: 'Notes'
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'status'>>) => {
      const newNote: Note = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
        status: 'active'
      };
      state.notes.push(newNote);
    },

    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = {
          ...action.payload,
          updatedAt: new Date().toLocaleString()
        };
      }
    },

    moveToTrash: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(note => note.id === action.payload);
      if (note) {
        note.status = 'trash';
        note.updatedAt = new Date().toLocaleString();
      }
      if (state.selectedNoteId === action.payload) {
        state.selectedNoteId = null;
        state.isEditorOpen = false;
      }
    },

    archiveNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(note => note.id === action.payload);
      if (note) {
        note.status = 'archived';
        note.updatedAt = new Date().toLocaleString();
      }
    },

    restoreNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(note => note.id === action.payload);
      if (note) {
        note.status = 'active';
        note.updatedAt = new Date().toLocaleString();
      }
    },

    deleteNotePermanently: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
      if (state.selectedNoteId === action.payload) {
        state.selectedNoteId = null;
        state.isEditorOpen = false;
      }
    },

    selectNote: (state, action: PayloadAction<string | null>) => {
      state.selectedNoteId = action.payload;
    },

    openEditor: (state, action: PayloadAction<string | null>) => {
      state.isEditorOpen = true;
      state.selectedNoteId = action.payload;
    },

    closeEditor: (state) => {
      state.isEditorOpen = false;
      state.selectedNoteId = null;
    },

    togglePinNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(note => note.id === action.payload);
      if (note) {
        note.isPinned = !note.isPinned;
        note.updatedAt = new Date().toLocaleString();
      }
    },

    addTag: (state, action: PayloadAction<string>) => {
      if (!state.tagList.includes(action.payload)) {
        state.tagList.push(action.payload);
      }
    },

    removeTag: (state, action: PayloadAction<string>) => {
      state.tagList = state.tagList.filter(tag => tag !== action.payload);
    },

    setSelectedTag: (state, action: PayloadAction<string>) => {
      state.selectedTag = action.payload;
    }
  }
});

export const {
  addNote,
  updateNote,
  moveToTrash,
  archiveNote,
  restoreNote,
  deleteNotePermanently,
  selectNote,
  openEditor,
  closeEditor,
  togglePinNote,
  addTag,
  removeTag,
  setSelectedTag
} = notesSlice.actions;

export default notesSlice.reducer;