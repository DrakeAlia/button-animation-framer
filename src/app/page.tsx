"use client";

import { stagger, useAnimate } from "framer-motion";

export default function Home() {
  const [scope, animate] = useAnimate();

  const onButtonClick = () => {
    animate([[".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }]]);
  };

  return (
    <div ref={scope}>
      <button
        onClick={onButtonClick}
        className="rounded-full text-2xl border-2 border-blue-600 px-6 py-2 text-blue-600 hover:bg-blue-100 transition-colors"
      >
        <span className="sr-only">Motion</span>
        <span
          className="block h-8 overflow-hidden"
          aria-hidden
        >
          {["M", "o", "t", "i", "o", "n"].map((letter, index) => (
            <span
              data-letter={letter}
              className="letter relative inline-block h-8 after:absolute after:left-0
              after:top-full after:h-8 after:content-[attr(data-letter)] leading-8"
              key={`${letter}-${index}`}
            >
              {letter}
            </span>
          ))}
        </span>
      </button>
    </div>
  );
}
