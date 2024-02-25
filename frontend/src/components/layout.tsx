import Header from "@/components/Header";
import React from "react";
import { Inter } from "next/font/google";
import CreatePost from "@/components/CreatePost";

const inter = Inter({ subsets: ["latin"] });

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <div className={`${inter.className} relative`}>
      <Header />
      <main className="min-h-screen flex-col items-center justify-between p-8">
        {children}
      </main>
      <CreatePost />
    </div>
  );
};

export default Layout;
