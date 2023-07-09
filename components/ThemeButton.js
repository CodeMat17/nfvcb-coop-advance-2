"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiSun } from "react-icons/bi";
import { HiMoon } from "react-icons/hi";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className={` transition duration-200 flex items-center rounded-full p-2 hover:bg-zinc-500 dark:hover:bg-zinc-700 
      ${resolvedTheme === "dark" ? "transition rotate-[-90deg]" : ""}`}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme === "dark" ? (
        <BiSun className='h-8 w-8 text-orange-300' />
      ) : (
        <HiMoon className='h-8 w-8 text-slate-300' />
      )}
    </button>
  );
};

export default ThemeButton;
