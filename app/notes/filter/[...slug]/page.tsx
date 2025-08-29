
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from 'next';



type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props) : Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  return {
    title: `Notes: ${tag}`,
    description: `${tag} notes list`,
    openGraph: {
      title: `Notes: ${tag}`,
      description: `${tag} notes list`,
      url: `https://08-zustand-ten-kappa.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "NoteHub logo",
        }
      ],
      type: 'article',
    }
  };
  
};


export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;


  const tagParam = slug?.[0] === "All" ? undefined : slug?.[0];


  const page = 1;
  const search = "";

  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, tagParam],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search,
        tag: tagParam,
      }),
  });


  const initialData =
    queryClient.getQueryData<FetchNotesResponse>(["notes", page, search, tagParam])!;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={initialData} tag={tagParam ?? "All"} />
    </HydrationBoundary>
  );
}
