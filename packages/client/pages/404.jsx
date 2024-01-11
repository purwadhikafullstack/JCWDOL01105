'use client';
import { FileSearch } from '@phosphor-icons/react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="min-h-screen max-w-xl mx-auto flex justify-center items-center">
      <div className="flex justify-center items-center gap-4 flex-col">
        <FileSearch size={50} className="bg-color-pallete1" />
        <h2 className="text-color-pallete1 text-2xl font-bold">
          404 - NOT FOUND
        </h2>
        <p>Sorry, the page that you are looking is not found.</p>
        <Link href="/">BACK TO HOME</Link>
      </div>
    </div>
  );
};

export default Page;
