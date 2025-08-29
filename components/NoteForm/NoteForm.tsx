"use client";

import css from "../NoteForm/NoteForm.module.css";
import { createNote } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { NewNoteData, NoteTag } from "@/types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useState } from "react";

interface NoteFormProps {
  onClose?: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const [error, setError] = useState<{ [key: string]: string }>({});

  type DraftKey = keyof NewNoteData;
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target as { name: DraftKey; value: string };

    const nextDraft: NewNoteData = {
      ...draft,
      [name]: name === "tag" ? (value as NoteTag) : value,
    } as NewNoteData;

    setDraft(nextDraft);
  };

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      if (onClose) onClose();
      else router.push("/notes/filter/All");
    },
    onError() {
      setError({ form: "Failed to create note. Please try again." });
    },
  });

  const toPayload = (formData: FormData): NewNoteData => {
    const title = String(formData.get("title") ?? "");
    const content = String(formData.get("content") ?? "");
    const tag = (String(formData.get("tag") ?? "Todo") as NoteTag) || "Todo";
    return { title, content, tag };
  };

  const handleSubmit = (formData: FormData) => {
    const values = toPayload(formData);
    mutation.mutate(values);
  };

  const handleCancel = () => {
    if (onClose) onClose();
    else router.back();
  };

  return (
    <form action={handleSubmit} className={css.form} noValidate>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
          required
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      {error.form && <span className={css.error}>{error.form}</span>}

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
        <button type="button" onClick={handleCancel} className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
}
