"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Nav from "@/components/nav";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import { fetchUrl } from "@/utils/url";
import { useCheckAuth } from "@/utils/hook";
import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import Loading from './../loading';
import { ErrorToast } from "@/utils/toast";

const Gallery = () => {
    const { user, authenticated } = useCheckAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    const { attributes, listeners, setNodeRef: dragRef, transform } = useDraggable({
        id: 'draggable',
    });
    const dragStyle = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    const userName = user?.user_metadata
        ? user?.user_metadata?.full_name || user?.user_metadata?.name
        : "";

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(fetchUrl)
                const data = await res.json();

                setData(data);
                setIsLoading(false);
            } catch (error: any) {
                ErrorToast(error.message);
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <Nav />
            <header className="container mx-auto flex items-center justify-center gap-4 my-4">
                <h1 className="text-xl sm:text-2xl font-semibold text-center text-primary">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-primary">{userName && userName} </span>Enjoy our <span className=" italic">Drag & Drop Feature</span>
                </h1>
            </header>
            <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6 select-none" ref={setNodeRef} style={style}>
                {data.map((item: any) => (
                    <div key={item.id} className="rounded-lg shadow-md relative h-full flex flex-col justify-between md:gap-4"
                        ref={dragRef} style={dragStyle} {...listeners} {...attributes}>
                        <Image
                            src={item.urls.regular}
                            alt={item.alt_description || "Unsplash Image"}
                            width={item.width}
                            height={item.height}
                            className="max-h-[20rem] h-full object-cover rounded-t-lg"
                        />
                        <div className='bg-[#F3F4F680] p-2 rounded-full absolute top-2 right-2 cursor-pointer hover:bg-red-600 hover:scale-105 transition-all'>
                            <BsFillHeartFill className='text-red-400 hover:text-red-700' />
                        </div>
                        <Link href={item.urls.small_s3} className='bg-[#F3F4F680] p-2 rounded-full absolute top-2 left-2 cursor-pointer hover:scale-105 transition-all'>
                            <FaDownload className='text-black' />
                        </Link>
                        <div className="px-2 sm:px-4 py-4">
                            <h2 className="text-xl font-semibold">{item.user.name}</h2>
                            <p className="text-gray-600">{item.description || "No description"}</p>
                            {item?.tags?.map((tag: any) => (
                                <span key={tag.title} className="text-sm text-gray-600">
                                    {tag.title}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </main>
            <footer className="container mx-auto flex items-center justify-center gap-4 mb-4 pt-4 border-t">
                <p className="text-xl text-gray-600 text-center">
                    Made with <span className="text-red-500">❤</span> by{" "}
                    <Link
                        href="https://github.com/Christiano112" target="_blank" rel="noopener noreferrer"
                        className="text-primary hover:underline"
                    >
                        Christiano
                    </Link>
                </p>
            </footer>
        </>
    )
}

export default Gallery;