"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Nav from "@/components/nav";
import Link from "next/link";
import { fetchUrl, searchUrl } from "@/utils/url";
import Loading from "./../loading";
import { ErrorToast } from "@/utils/toast";
import { useUser } from "@supabase/auth-helpers-react";
import Parent from "./drop";

const Gallery = () => {
  const user = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const userName = user?.user_metadata
    ? user?.user_metadata?.full_name || user?.user_metadata?.name
    : "";

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
  }, [router, user]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const url = query ? `${searchUrl}&query=${query}` : fetchUrl;
        const res = await fetch(url);
        const data = await res.json();

        if (!query) {
          setData(data);
        } else {
          setData(data.results);
        }
      } catch (error: any) {
        ErrorToast(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Nav />
      <header className="container mx-auto flex items-center justify-center gap-4 my-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-center text-primary">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-primary">
            {userName && userName}{" "}
          </span>{" "}
          Select Your <span className="italic"> Best Image</span>
        </h1>
      </header>
      <main>
        <Parent data={data} />
      </main>
      <footer className="container mx-auto flex items-center justify-center gap-4 mb-4 pt-4 border-t">
        <p className="text-xl text-gray-600 text-center">
          Made with <span className="text-red-500">❤</span> by{" "}
          <Link
            href="https://github.com/Christiano112"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Christiano
          </Link>
        </p>
      </footer>
    </>
  );
};

export default Gallery;
