"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DP from "@/public/avatar.webp";
import { AiOutlineSearch } from "react-icons/ai";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";

const Nav = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const user = useUser();

  const profilePic = user?.user_metadata
    ? user?.user_metadata?.avatar_url || user?.user_metadata?.picture
    : DP;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/gallery?q=${searchQuery}`);
    }
  };

  return (
    <header className="shadow py-2 md:py-0">
      <nav className="container-fluid mx-auto flex items-center justify-between gap-4 px-2 2xs:px-4">
        <Link
          href="/"
          className="flex items-center cursor-pointer no-underline"
        >
          <Image
            src={profilePic}
            alt="Profile Picture"
            width={50}
            height={50}
            priority
            className="min-h-[2rem] min-w-[2rem] rounded-full"
          />
        </Link>
        <div className="relative flex-grow text-center max-w-[30rem]">
          <input
            type="search"
            id="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleChange}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            className="w-full py-2 pl-2 pr-2 text-sm text-tertiary bg-white border border-primary-50 rounded-md focus:ring-1 focus:ring-primary focus:outline-none focus:ring-opacity-50"
          />
          <AiOutlineSearch
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-slate-400 cursor-pointer"
            size={20}
            onClick={handleSearch}
          />
        </div>
        <div className="hidden md:block">
          {user ? (
            <button className="btn" onClick={() => router.push("/gallery")}>
              Drag & Drop
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <button className="btn" onClick={() => router.push("/login")}>
                Login
              </button>
            </div>
          )}
        </div>
        <button
          className="text-primary md:hidden transition-all transform duration-300 ease-in-out border-none outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-labelledby="menu"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${isOpen ? "animate-rotate180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {isOpen && (
          <div
            className="mt-2 space-y-2 md:hidden absolute left-0 right-0 top-14 pl-4 bg-tertiary/80 pr-2 py-4 transition-all ease-linear duration-500 z-50"
            id="menu"
          >
            {user ? (
              <button className="btn" onClick={() => router.push("/gallery")}>
                Drag & Drop
              </button>
            ) : (
              <div className="flex flex-col max-w-[6rem]">
                <button className="btn" onClick={() => router.push("/login")}>
                  Login
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
