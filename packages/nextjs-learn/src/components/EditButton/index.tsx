// components/EditButton.js
import Link from "next/link";
import React from "react";

interface IProps {
  noteId: string;
  children: React.ReactNode;
}

export default function EditButton({ noteId, children }: IProps) {
  const isDraft = noteId == null;
  return (
    <Link href={`/note/edit/${noteId || ""}`} className="link--unstyled">
      <button
        className={[
          "edit-button",
          isDraft ? "edit-button--solid" : "edit-button--outline",
        ].join(" ")}
        role="menuitem"
      >
        {children}
      </button>
    </Link>
  );
}
