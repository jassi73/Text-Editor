import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rich Text Editor",
  description: "Rich Text editor",
  generator: "Jasa Ram - Frontend Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
