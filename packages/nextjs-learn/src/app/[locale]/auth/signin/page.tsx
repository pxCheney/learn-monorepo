import { signIn } from "@/auth";
import querystring from "querystring";

console.log(
  "querystring",
  querystring.parse(
    decodeURIComponent(
      "http://localhost:3000/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fnote%2Fedit",
    ),
  ),
);

export default async function SignIn() {
  return (
    <div>
      <h3 className="text-center mb-10">auth signin</h3>
      <form
        action={async (formData) => {
          "use server";

          const response = await fetch("http://localhost:3000/api/auth/csrf");
          const { csrfToken } = await response.json();
          formData.append("csrfToken", csrfToken);
          const resp = await signIn("credentials", formData);
        }}
        className="flex flex-col items-center"
      >
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
