"use client";

import RichTextEditor from "../components/RichTextEditor";

export default function Page() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Rich Text Editor</h1>
      <RichTextEditor />
    </div>
  );
}
