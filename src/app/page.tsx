"use client";

import { animate, stagger, useAnimate } from "framer-motion";

// Helper function to generate random numbers within a range
const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Define the type for our animation sequence
type AnimationSequence = Parameters<typeof animate>[0];

export default function Home() {
  // Set up animation hook from Framer Motion
  const [scope, animate] = useAnimate();

  // Function that runs when the button is clicked
  const onButtonClick = () => {
    // Create an array of 20 undefined items (will be used for sparkles)
    const sparkles = Array.from({ length: 20 });

    // Define animation for sparkles to appear and spread out
    const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: randomNumberBetween(-100, 100),
        y: randomNumberBetween(-100, 100),
        scale: randomNumberBetween(1.5, 2.5),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: "<",
      },
    ]);

    // Define animation for sparkles to fade out
    const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.3,
        at: "<",
      },
    ]);

    // Define animation to reset sparkles to original position
    const sparklesReset: AnimationSequence = sparkles.map((_, index) => [
      `sparkle-${index}`,
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.000001,
      },
    ]);

    // Run the full animation sequence
    animate([
      ...sparklesReset,
      // Animate letters upwards
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      // Scale button down
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      // Scale button back up
      ["button", { scale: 1 }, { duration: 0.1 }],
      ...sparklesAnimation,
      // Reset letters to original position
      [".letter", { y: 0 }, { duration: 0.000001 }],
      ...sparklesFadeOut,
    ]);
  };

  // Render the component
  return (
    // Container div, centered on screen
    <div
      className="h-screen w-full flex items-center justify-center"
      ref={scope}
    >
      {/* Button element */}
      <button
        onClick={onButtonClick}
        className="rounded-full text-2xl border-2 border-blue-600 px-6 py-2 text-blue-600 hover:bg-blue-100 transition-colors relative"
      >
        {/* Hidden text for screen readers */}
        <span className="sr-only">Motion</span>
        {/* Visible text */}
        <span className="block h-8 overflow-hidden" aria-hidden>
          {/* Map each letter to a span for individual animation */}
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
        {/* Container for sparkle elements */}
        <span
          aria-hidden
          className="absolute inset-0 block pointer-events-none -z-10"
        >
          {/* Create 20 sparkle SVG elements */}
          {Array.from({ length: 20 }).map((_, index) => (
            <svg
              className={`absolute opacity-0 left-1/2 top-1/2 sparkle-${index}`}
              key={index}
              viewBox="0 0 122 117"
              width="10"
              height="10"
            >
              <path
                className="fill-blue-600"
                d="M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z"
              />
            </svg>
          ))}
        </span>
      </button>
    </div>
  );
}