import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { addUser, getUser } from "@/lib/prisma";

type TUser = { username?: string; password?: string; code?: number };

const providers: Provider[] = [
  CredentialsProvider({
    // 显示按钮文案 (e.g. "Sign in with...")
    name: "Account number",
    // `credentials` 用于渲染登录页面表单
    credentials: {
      username: {
        label: "账号",
        type: "text",
        placeholder: "请输入您的账号",
      },
      password: {
        label: "密码",
        type: "password",
        placeholder: "请输入您的密码",
      },
    },
    // 处理从用户收到的认证信息
    async authorize(credentials, req) {
      // 默认情况下不对用户输入进行验证，确保使用 Zod 这样的库进行验证
      let user;

      console.log("PX", credentials);
      // 登陆信息验证
      user = await getUser(credentials.username, credentials.password);

      // 密码错误
      if (user === 1) return null;

      // 用户注册
      if (user === 0) {
        user = await addUser(credentials.username, credentials.password);
      }

      if (!user) {
        throw new Error("User was not found and could not be created.");
      }

      return user;
    },
  }),
  GitHub,
  Google,
];

export const config: NextAuthConfig = {
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    /**
     * 有了 authMiddleware 处理这里 authorized 就不生效了?
     * */
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/note/edit")) return !!auth;
      return true;
    },
    /**
     * user: authorize 返回的
     * */
    jwt({ token, user, account }) {
      if (account && account.type === "credentials" && user) {
        token.userId = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.userId as string;
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});
