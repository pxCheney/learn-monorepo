"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { importNote } from "@/app/actions/upload";

export default function SidebarImport() {
  const router = useRouter();

  const onChange = async (e) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    // 使用 API 接口，路由处理程序
    // try {
    //   const response = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });
    //
    //   if (!response.ok) {
    //     console.error("something went wrong");
    //     return;
    //   }
    //
    //   const data = await response.json();
    //   router.push(`/note/${data.uid}`);
    //   router.refresh();
    // } catch (error) {
    //   console.error("something went wrong");
    // }

    // 使用 Server Actions API
    try {
      const data = await importNote(formData);
      router.push(`/note/${data.uid}`);
    } catch (error) {
      console.error("something went wrong");
    }

    // 重置 file input
    e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <label
        htmlFor="file"
        style={{
          cursor: "pointer",
          margin: 20,
          border: "1px solid #037dba",
          color: "#037dba",
          padding: 8,
          borderRadius: 12,
        }}
      >
        Import .md File
      </label>
      <input
        type="file"
        id="file"
        name="file"
        style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
        onChange={onChange}
        accept=".md"
      />
    </div>
  );
}
