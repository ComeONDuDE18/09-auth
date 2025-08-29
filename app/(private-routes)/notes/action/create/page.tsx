import { Metadata } from 'next';
import css from './Create.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';


export const metadata: Metadata = {
  title: "Create note — NoteHub",
  description: "Create a new note and organize it with tags.",
  openGraph: {
    title: "Create note — NoteHub",
    description: "Quickly create a new note and keep your ideas organized.",
    url: "https://08-zustand-ten-kappa.vercel.app/notes/action/create",
    images: [{
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" ,
        width: 1200,
        height: 630,
        alt: "NoteHub Create Note"  
        }],
    type: "article",
     }
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm/>
      </div>
    </main>
  );
}
