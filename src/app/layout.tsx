import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@mdxeditor/editor/style.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Folium ater CMS",
  description: "CMS to Folium ater Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
