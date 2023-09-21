"use client";

import { useState } from "react";
import { useDroppable, useDraggable, DndContext } from "@dnd-kit/core";
import Image from "next/image";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import RenderTopicSubmissions from "@/components/topic";

const DragMe = (props: any) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="rounded-lg shadow-md relative h-full flex flex-col justify-between md:gap-4"
    >
      {props.children}
    </div>
  );
};

const EmptyDrop = () => {
  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg min-h-[10rem] h-full mx-auto w-1/2 max-w-20rem flex items-center justify-center">
      <p className="text-center">Drop Here</p>
    </div>
  );
};

const DropHere = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "#543EE0" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

const DraggableMarkup = ({ item }: any) => {
  return (
    <div className="max-w-[30rem] mx-auto w-[90%]">
      <DragMe id={item.id} key={item.id}>
        <Image
          src={item.urls.regular}
          alt={item.alt_description || "Unsplash Image"}
          width={item.width}
          height={item.height}
          className="max-h-[20rem] h-full object-cover rounded-t-lg"
        />
        <div className="bg-[#F3F4F680] p-2 rounded-full absolute top-2 right-2 cursor-pointer hover:bg-red-600 hover:scale-105 transition-all">
          <BsFillHeartFill className="text-red-400 hover:text-red-700" />
        </div>
        <Link
          href={item.urls.small_s3}
          className="bg-[#F3F4F680] p-2 rounded-full absolute top-2 left-2 cursor-pointer hover:scale-105 transition-all"
        >
          <FaDownload className="text-black" />
        </Link>
        <div className="px-2 sm:px-4 py-4 flex flex-col">
          <h2 className="text-xl font-semibold">{item.user.name}</h2>
          <p className="text-gray-600 my-2">
            {item.description || "No description"}
          </p>
          {RenderTopicSubmissions(item)}
        </div>
      </DragMe>
    </div>
  );
};

const Parent = ({ data }: any) => {
  const [parent, setParent] = useState<number | null>(null);
  const [id, setId] = useState<number>(1);
  const containers = [id];

  function handleDragEnd(event: any) {
    const { over } = event;

    setParent(over ? over.id : null);
  }

  function handleDragMove(event: any) {
    console.log("event", event);
    const { active } = event;

    setId(active.id);
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragMove={handleDragMove}>
      {containers.map((id: number) => {
        const markupData = data.find((item: any) => item.id === id);
        return (
          <DropHere key={id} id={id}>
            {parent === id ? (
              <DraggableMarkup item={markupData} />
            ) : (
              <EmptyDrop />
            )}
          </DropHere>
        );
      })}

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6 select-none">
        {data.map((item: any) => (
          <DraggableMarkup key={item.id} item={item} />
        ))}
      </div>
    </DndContext>
  );
};

export default Parent;
