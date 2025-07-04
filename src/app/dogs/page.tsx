"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Dogs() {
  const [dogData, setDogData] = useState<{
    url: string;
    width: number;
    height: number;
  }>({ url: "", width: 0, height: 0 });

  useEffect(() => {
    getNewDog();
  }, []);

  const getNewDog = () => {
    fetch("/api/dog")
      .then((res) => res.json())
      .then(async (data) => {
        setDogData(data[0]);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="border-2 rounded m-1 p-1 hover:bg-blue-950 active:bg-blue-400 active:scale-90 transition-all"
        onClick={getNewDog}
      >
        {dogData.url && dogData.width && dogData.height && (
          <Image
            src={dogData.url}
            alt="Dog"
            width={dogData.width}
            height={dogData.height}
            className="max-h-[70vh]"
          />
        )}
        Click for more dogs!
      </button>
    </div>
  );
}
