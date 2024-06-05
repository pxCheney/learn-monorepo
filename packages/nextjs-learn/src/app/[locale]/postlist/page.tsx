"use client";
// app/postList/page.tsx
import React, { useEffect, useState } from "react";

export default function Blog() {
  const [data, setData] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((posts) => setData(posts.slice(0, 10)));
  }, []);

  return (
    <>
      <button
        onClick={async () => {
          const res = await fetch("https://jsonplaceholder.typicode.com/posts");
          const posts = await res.json();
          setData(posts.slice(10, 20));
        }}
      >
        换一批
      </button>
      <ul>{data?.map((post) => <li key={post.id}>{post?.title}</li>)}</ul>
    </>
  );
}

// 客户端组建 csr 无法使用 getStaticProps，与 react hooks 一样在 useEffect 中发起请求与使用

// export async function getStaticProps() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//   const posts = await res.json()
//   return {
//     props: {
//       posts: posts.slice(0, 10),
//     },
//   }
// }
