"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Cats() {
  const [catData, setCatData] = useState<{
    url: string;
    width: number;
    height: number;
  }>({ url: "", width: 0, height: 0 });

  useEffect(() => {
    getNewCat();
  }, []);

  const getNewCat = () => {
    fetch("/api/cat")
      .then((res) => res.json())
      .then(async (data) => {
        setCatData(data[0]);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="border-2 rounded m-1 p-1 hover:bg-blue-950 active:bg-blue-400 active:scale-90 transition-all"
        onClick={getNewCat}
      >
        {catData.url && catData.width && catData.height && (
          <Image
            src={catData.url}
            alt="Cat"
            width={catData.width}
            height={catData.height}
            className="max-h-[70vh]"
          />
        )}
        Click for more cats!
      </button>
    </div>
  );
}
