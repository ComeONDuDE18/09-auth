import axios from "axios";
import type { Note, NoteTag } from "../types/note";




axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
if (!myKey) {
  throw new Error("NEXT_PUBLIC_NOTEHUB_TOKEN is not defined");
}
axios.defaults.headers.common["Authorization"] = `Bearer ${myKey}`;



export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
    
 
}


export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
    tag?: string;
}


export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      ...(search && { search }),
      ...(tag && { tag }),
      page,
      perPage,
    },
  });

  return response.data;
};


export const createNote = async (note: {
    title: string;
    content: string;
    tag: NoteTag;
}): Promise<Note> => {
    const response = await axios.post<Note>('/notes', note);

    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await axios.delete<Note>(`/notes/${id}`);
    return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
};