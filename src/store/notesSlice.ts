import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, NoteState } from '../types';
import { v4 as uuidv4 } from 'uuid';

const initialState: NoteState = {
  notes: [],
  selectedNoteId: null,
  isEditorOpen: false,
  tagList: ['Coding', 'Exercise', 'Quotes']
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newNote: Note = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
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

    deleteNote: (state, action: PayloadAction<string>) => {
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
    }
  }
});

export const {
  addNote,
  updateNote,
  deleteNote,
  selectNote,
  openEditor,
  closeEditor,
  togglePinNote,
  addTag,
  removeTag
} = notesSlice.actions;

export default notesSlice.reducer;