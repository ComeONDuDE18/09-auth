"use client";


import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Link from "next/link";


import css from "./Notes.module.css";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import type { FetchNotesResponse } from "@/lib/api";

type NotesDetailsClientProps = {
  tag: string;
  initialData: FetchNotesResponse;
 }



export default function NotesDetailsClient({ initialData,tag }: NotesDetailsClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  
  const [debouncedSearchTerm] = useDebounce(search, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const tagParam = tag === "All" ? undefined : tag;

const { data, isLoading, error, isSuccess } = useQuery<FetchNotesResponse>({
  queryKey: ["notes", page, debouncedSearchTerm, tag],
   queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearchTerm, tag: tagParam }),
  placeholderData: keepPreviousData,
    initialData,
});


  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        
        <SearchBox value={search} onChange={setSearch} />

        {isLoading && <strong className={css.loading}>Loading please wait...</strong>}
      {error && <p className={css.error}>Something went wrong.{error.message}</p>}
   

        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}

       <Link className={css.button} href="/notes/action/create">Create +</Link>
      </header>

      {isSuccess && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found</p>
      )}


    </div>
  );
}