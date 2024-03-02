import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@mdxeditor/editor/style.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lux Ater CMS",
  description: "CMS to Lux Ater Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
