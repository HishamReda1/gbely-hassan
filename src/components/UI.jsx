import { useFont, useGLTF } from "@react-three/drei";
import { atom, useAtom } from "jotai";
import React, { useRef, useState, useEffect } from "react";

export const themeAtom = atom("underwater");

export const THEMES = {
  underwater: {
    key: "underwater",
    skyColor: "#309BFF",
    sunColor: "#FE9E40",
    groundColor: "#DDD6F3",
    title: "Visuals",
    subtitle: `Gbely`,
    models: [`Koi_01`, `Koi_02`, `Koi_03`, `Koi_04`, `Koi_05`, `Koi_06`, `Koi_11`, `Koi_10`],
    dof: true,
  },
  space: {
    key: "space",
    skyColor: "#000000",
    sunColor: "#e1ae4e",
    groundColor: "#333333",
    title: "Sounds",
    subtitle: "Hassan",
    models: [`Koi_08`, `Koi_09`, `Guitar`, `Piano Keys`, `Koi_09`],
    dof: false,
  },
};

export const Preloader = () => {
  useEffect(() => {
    Object.values(THEMES).forEach((theme) => {
      theme.models.forEach((model) => useGLTF.preload(`/models/${model}.glb`));
    });

    useFont.preload("/fonts/Tokyo 2097_Regular.json");
  }, []);

  return null;
};

export const UI = () => {
  const audioRef = useRef(null);
  const [theme, setTheme] = useAtom(themeAtom);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <Preloader />

      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-center items-center flex-col">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(0,0,0,0.0)_70%,rgba(0,0,0,1)_170%)]" />
        <div className="absolute z-10 pointer-events-auto flex flex-col items-center justify-center bottom-0 w-screen p-10 gap-2">
          <div className="flex gap-2 items-center justify-center">
            {Object.values(THEMES).map((t) => (
              <button
                key={t.key}
                onClick={() => setTheme(t.key)}
                className={`eye p-4 rounded-full border-2 border-white transition-all duration-500 bg-transparent min-w-36 hover:bg-opacity-100 ${
                  theme === t.key
                    ? "bg-opacity-70 text-black"
                    : "bg-opacity-20 border-opacity-70 text-black/80"
                }`}
              >
                {t.title}
              </button>
            ))}

            <button
              className={`p-4 rounded-full border-2 border-white transition-all duration-500 bg-transparent min-w-36 hover:bg-opacity-100`}
            >
              <a href="http://">Music video</a>
            </button>
             {/* Play/Pause Button */}
          <button
            className={`p-4 rounded-full border-2 border-white transition-all duration-500 bg-transparent min-w-10 hover:bg-opacity-100`}
            onClick={toggleMusic}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 5.25h-3a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h3a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25zM16.5 5.25h-3a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h3a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z"
                />
              </svg>
            )}
          </button>
          <audio ref={audioRef} src="/mama-instrumental.mp3" />
          </div>

         
        </div>
      </main>
    </>
  );
};
