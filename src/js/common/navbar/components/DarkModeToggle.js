import React, { useEffect, useState } from "react";

function DarkModeToggleUI(props) {
  // currentTheme gives the color of the toggle svg
  const [currentTheme, setCurrentTheme] = useState("black");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches &&
        localStorage.theme !== "light")
    ) {
      setCurrentTheme("white");
    } else {
      setCurrentTheme("black");
    }
  }, []);

  const changeTheme = () => {
    if (localStorage.theme === "dark") {
      setCurrentTheme("black");
      localStorage.theme = "light";
      document.querySelector("html").classList.remove("dark");
    } else {
      setCurrentTheme("white");
      localStorage.theme = "dark";
      document.querySelector("html").classList.add("dark");
    }
  };

  if (props.position === "pages") {
    return (
      <span className="px-3 py-2 hidden lg:flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={currentTheme}
          className="w-20 h-20 cursor-pointer"
          onClick={changeTheme}
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>
    );
  } else if (props.position === "hamburger") {
    return (
      <div className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={currentTheme}
          className="w-20 h-20 cursor-pointer"
          onClick={changeTheme}
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
    );
  }
}

export const DarkModeToggle = DarkModeToggleUI;
