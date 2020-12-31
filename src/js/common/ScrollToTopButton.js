import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";

function ScrollToTopButtonUI() {
  const [scrollToTopClassName, setScrollToTopClassName] = useState(
    "w-20 invisible h-20 fixed bottom-5 right-5"
  );

  useEffect(() => {
    window.onscroll = function () {
      if (window.pageYOffset > window.innerHeight * 0.75) {
        setScrollToTopClassName("w-20 h-20 fixed bottom-5 right-5");
      } else {
        setScrollToTopClassName("w-20 invisible h-20 fixed bottom-5 right-5");
      }
    };
    return () => window.removeEventListener("scroll", window.onscroll);
  });

  return (
    <HashLink smooth to="#start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={scrollToTopClassName}
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </HashLink>
  );
}

export const ScrollToTopButton = ScrollToTopButtonUI;
