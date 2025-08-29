
import Link from 'next/link';
import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Page not found — NoteHub",
  description:
    "The page you are looking for does not exist. Check the URL or go back to the notes list.",
  openGraph: {
    title: "Page not found — NoteHub",
    description:
      "Looks like this page does not exist. Go back to the notes list or create a new note.",
    url: "https://08-zustand-azure.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;

