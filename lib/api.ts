import axios from 'axios';
import type { NewNote, Note, FetchNoteList } from '../types/note';

const baseURL = process.env.NEXT_PUBLIC_API_URL+'/api';

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});


export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<FetchNoteList> => {
  const params = {
    perPage: 12,
    page,
    tag,
    search,
  };

  if (search.trim() !== '') {
    params.search = search;
  }

  const response = await nextServer.get<FetchNoteList>(`/notes`, {
    params,
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);

  return response.data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', noteData);

  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);

  return response.data;
};
