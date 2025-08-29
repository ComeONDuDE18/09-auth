"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";

import css from './NoteDetails.module.css'

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({id}: NoteDetailsClientProps) {
   

const { data, isLoading, isError } = useQuery<Note>({
  queryKey: ["note", id],
  queryFn: () => fetchNoteById(id),
  refetchOnMount: false,
});


    console.log(data);


 
    if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Something went wrong.</p>;
    if (!data) return <p>No note found.</p>;

    return (
        <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
                    <h2>{data.title}</h2>
	  </div>
                <p className={css.content}>{data.content}</p>
                <p className={css.date}>{new Date(data.createdAt).toLocaleString()}</p>
	</div>
</div>
    );
}