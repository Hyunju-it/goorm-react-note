export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  backgroundColor: string;
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  status: 'active' | 'archived' | 'trash';
}

export interface NoteState {
  notes: Note[];
  selectedNoteId: string | null;
  isEditorOpen: boolean;
  tagList: string[];
  selectedTag: string;
}

export type Priority = 'Low' | 'Medium' | 'High';
export type BackgroundColor = 'White' | 'Red' | 'Green' | 'Blue' | 'Yellow' | 'Pink';