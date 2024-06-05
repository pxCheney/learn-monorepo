import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

type TUser = { username?: string; password?: string; code?: number };

export const { handlers, auth, signIn, signOut } = NextAuth({
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [GitHub, Google],
  callbacks: {
    /**
     * 有了 authMiddleware 处理这里 authorized 就不生效了?
     * */
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/note/edit")) return !!auth;
      return true;
    },
  },
});
