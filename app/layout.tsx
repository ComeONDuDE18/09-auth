import type { Metadata } from "next";

import "./globals.css";
import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap"
})



export const metadata: Metadata = {
 title: "NoteHub — Fast notes, search & tags",
  description:
    "NoteHub helps you create, organize, and find notes instantly with powerful search and tags.",
  openGraph: {
    title: "NoteHub — Fast notes, search & tags",
    description:
      "Create notes, filter by tags, and find content instantly. All in NoteHub.",
    url: "https://08-zustand-azure.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Open Graph",
      },
    ],
    siteName: "NoteHub",
    type: "website",
     }
};

export default function RootLayout({
  children,
    modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
   }>) { 
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
             <TanStackProvider>
        <div className="container">
          <Header />
          {children}
          {modal}
          <Footer />
        </div>
             </TanStackProvider>
      </body>
    </html>
  );
}
