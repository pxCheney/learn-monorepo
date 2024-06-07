"use client";

import { useEffect, useState } from "react";

export default function SignIn() {
  // TODO: 通过 "use server" 使用 auth 中 signin 方法
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/csrf")
      .then((response) => response.json())
      .then((data) => setCsrfToken(data.csrfToken));
  }, []);

  return (
    <div>
      <h3 className="text-center mb-10">auth signin</h3>
      <form
        method="post"
        action="/api/auth/callback/credentials"
        className="flex flex-col items-center"
      >
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <label className="input input-bordered flex items-center gap-12">
          UserName
          <input
            type="text"
            name="username"
            className="grow"
            placeholder="请输入用户名"
          />
        </label>

        <label className="input input-bordered flex items-center gap-12 mt-12">
          PassWord
          <input
            type="password"
            name="password"
            className="grow"
            placeholder="请输入密码"
          />
        </label>
        <button className="btn mt-12" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
