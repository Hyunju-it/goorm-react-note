export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  priority: 'High' | 'Medium' | 'Low';
  backgroundColor: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
}

export type Priority = 'High' | 'Medium' | 'Low';
export type BackgroundColor = 'White' | 'Yellow' | 'Pink' | 'Blue' | 'Green';

export interface FormatState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  color: string;
  fontSize: string;
}