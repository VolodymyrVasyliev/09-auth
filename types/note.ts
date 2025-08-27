export type NoteTag =
  | 'Todo'
  | 'Work'
  | 'Personal'
  | 'Shopping'
  | 'Meeting'
  | 'Ideas'
  | 'Travel'
  | 'Finance'
  | 'Health'
  | 'Important';

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tag: NoteTag;
};

export type NewNote = {
  title: string;
  content: string;
  tag: NoteTag;
};

export type FetchNoteList = {
  notes: Note[];
  totalPages: number;
};
