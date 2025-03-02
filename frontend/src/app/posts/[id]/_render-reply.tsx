"use client";

import { defaultExtensions } from "@/components/wysiwyg/extensions";
import { generateHTML } from "@tiptap/html";
import { JSONContent } from "novel";

export function RenderReply({ content }: { content: string | TrustedHTML }) {
  const html = generateHTML(content as JSONContent, defaultExtensions);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="!p-2 rounded-md prose prose-sm prose-h1:text-3xl prose-h1:font-semibold dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full"
    />
  );
}
