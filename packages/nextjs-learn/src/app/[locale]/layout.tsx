import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Sidebar from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import type { Locale } from "@/config";
import Header from "@/components/Header";

import "./globals.css";
import "./style.css";

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="nextjs-container">
            <Header>
              <Footer lng={locale} />
            </Header>
            <div className="main">
              <Sidebar />
              <section className="col note-viewer relative">{children}</section>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import classNames from "classnames";
// import "./globals.css";
// import React from "react";
//
// const inter = Inter({ subsets: ["latin"] });
//
// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
//
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={classNames(inter.className, "app-router-body")}>
//         {children}
//       </body>
//     </html>
//   );
// }
