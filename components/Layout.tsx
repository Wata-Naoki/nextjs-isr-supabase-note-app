import Head from "next/head";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import React from "react";
type Title = {
  title: string;
  children: React.ReactNode;
};
export const Layout: React.FC<Title> = ({ children, title = "Note app" }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <main className="flex w-screen flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <footer className="flex h-12 w-full items-center justify-center border-t">
        <BadgeCheckIcon className="h-6 w-6 text-blue-500" />
      </footer>
    </div>
  );
};
