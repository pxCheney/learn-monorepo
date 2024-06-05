import dayjs from "dayjs";
import { getAllNotes, IData } from "@/lib/strapi";
import { sleep } from "@/lib/utils";
import SidebarNoteListFilter from "@/components/SidebarNoteListFilter";

function SidebarNoteItemHeader({ title, updateTime }) {
  return (
    <header className="sidebar-note-header">
      <strong>{title}</strong>
      <small>{dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}</small>
    </header>
  );
}

export default async function NoteList() {
  // await sleep(2000);

  const notes = await getAllNotes();
  const arr = Object.entries(notes);

  if (arr.length === 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return (
    <SidebarNoteListFilter
      notes={Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note);
        return {
          noteId,
          note: noteData,
          header: (
            <SidebarNoteItemHeader
              title={noteData.title}
              updateTime={noteData.updateTime}
            />
          ),
        };
      })}
    />
  );
}
