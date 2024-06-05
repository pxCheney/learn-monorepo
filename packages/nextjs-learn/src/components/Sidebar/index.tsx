import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import SidebarNoteList from "@/components/SidebarNoteList";
import NoteListSkeleton from "@/components/NoteListSkeleton";
import EditButton from "@/components/EditButton";
import SidebarSearchField from "@/components/SidebarSearchField";
import SidebarImport from "@/components/SidebarImport";

export default async function Sidebar() {
  const t = await getTranslations("Basic");
  return (
    <>
      <section className="col sidebar">
        <Link
          href={"https://github.com/reactjs/server-components-demo/tree/main"}
          className="link--unstyled"
        >
          <section className="sidebar-header">
            <Image
              className="logo"
              src="/logo.svg"
              width="22"
              height="20"
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField />
          <EditButton noteId="">{t("new")}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            {/*<SidebarNoteList notes={notes} />*/}
            <SidebarNoteList />
          </Suspense>
        </nav>
        <SidebarImport />
      </section>
    </>
  );
}
