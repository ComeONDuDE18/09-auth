export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export type NewNoteData = {
  title: string;
  content: string;
  tag: string;
}

export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
    tag?: string;
}

export interface FetchNotesResponse {
    page: number;
    data: Note[];
    total_pages: number;
    perPage: number;
}



export type RegisterRequestData = {
   email: string,
  password: string
}

export type UpdateUserRequest = {
  username: string;
}

export type LoginRequestData = {
   email: string,
  password: string
}

export interface RawFetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type CheckSessionRequest = {
  success: boolean;
}
