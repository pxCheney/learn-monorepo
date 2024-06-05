"use client";

import React, { useState, useRef, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

interface IProps {
  id: string;
  title: string;
  children: React.ReactNode;
  expandedChildren: React.ReactNode;
}

export default function SidebarNoteContent({
  id,
  title,
  children,
  expandedChildren,
}: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const selectedId = pathname?.split("/")[1] || null;

  const [isPending] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = id === selectedId;

  // Animate after title is edited.
  const itemRef = useRef<HTMLDivElement>(null);
  const prevTitleRef = useRef<HTMLElement | string>(title);

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current?.classList.add("flash");
    }
  }, [title]);

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current?.classList.remove("flash");
      }}
      className={[
        "sidebar-note-list-item",
        isExpanded ? "note-expanded" : "",
      ].join(" ")}
    >
      {children}
      <button
        className="sidebar-note-open"
        style={{
          backgroundColor: isPending
            ? "var(--gray-80)"
            : isActive
              ? "var(--tertiary-blue)"
              : "",
          border: isActive
            ? "1px solid var(--primary-border)"
            : "1px solid transparent",
        }}
        onClick={() => {
          const sidebarToggle: any = document.getElementById("sidebar-toggle");
          if (sidebarToggle) {
            sidebarToggle.checked = true;
          }

          const params = new URLSearchParams(window.location.search);
          const qs = params.toString();
          router.push(`/note/${id}${qs ? `?${qs}` : ""}`);
        }}
      >
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        <Image
          src={isExpanded ? "/chevron-down.svg" : "/chevron-up.svg"}
          width="10"
          height="10"
          alt={isExpanded ? "Collapse" : "Expand"}
        />
      </button>
      {isExpanded && expandedChildren}
    </div>
  );
}
